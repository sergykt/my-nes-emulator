/* eslint no-void: ["error", { "allowAsStatement": true }] */
import type { FC, DragEvent } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  setGameName,
  setFullScreen,
  togglePause,
  fetchRom,
  setGameRom,
} from '@store/emulatorSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import RomService from '@services/RomService';
import { type IRom } from '@/types';
import { nesToggleStart } from '@/engine';
import games from '@/engine/games';
import PageLayout from '@components/PageLayout';
import Screen from '@components/Screen';
import GamesSwiper from '@components/GamesSwiper';
import LocalRomsList from '@components/LocalRomsList';
import Button from '@components/Button';
import Container from '@components/Container';
import styles from './EmulatorPage.module.scss';

const Emulator: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { gameName, isStarted, isPaused } = useAppSelector((state) => state.emulator);
  const location = useLocation();
  const initialRoms = RomService.getRoms();
  const [localRoms, setLocalRoms] = useState<IRom[]>(initialRoms);

  useEffect(() => {
    const pathArray = location.pathname.split('/');
    const idQueryParam = searchParams.get('id');

    if (idQueryParam) {
      const localRom = RomService.getRomById(Number(idQueryParam));
      if (localRom) {
        dispatch(setGameName(localRom.name));
        dispatch(setGameRom(localRom.romData));
      }
    } else if (pathArray.length > 0) {
      const gameNameFromLink = pathArray[2];
      const currentGame = games.find((item) => item.shortName === gameNameFromLink);
      if (currentGame) {
        const { name, shortName } = currentGame;
        const romPath = `/games/${shortName}.nes`;
        dispatch(setGameName(name));
        void dispatch(fetchRom(romPath));
      }
    }
  }, []);

  const pauseHandler = useCallback(() => {
    nesToggleStart();
    dispatch(togglePause());
  }, []);

  const fullScreenHandler = useCallback(() => {
    dispatch(setFullScreen(true));
  }, []);

  const dragHandler = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const dropHandler = useCallback(async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const file = e.dataTransfer?.files[0];
      const romObj = await RomService.saveRom(file);
      setLocalRoms([...localRoms, romObj]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeRomHandler = useCallback((id: number): void => {
    const result = RomService.removeRom(id);
    if (result) {
      setLocalRoms(RomService.getRoms());
    }
  }, []);

  return (
    <PageLayout>
      <div
        className={styles.emulator}
        onDragEnter={dragHandler}
        onDragLeave={dragHandler}
        onDragOver={dragHandler}
        onDrop={dropHandler}
      >
        <Container className={styles.container}>
          {gameName && <h1 className={styles.gameName}>{gameName}</h1>}
          <Screen pauseHandler={pauseHandler} />
          <div className={styles.buttonGroup}>
            <Button onClick={fullScreenHandler}>Full Screen</Button>
            {isStarted && <Button onClick={pauseHandler}>{isPaused ? 'Resume' : 'Pause'}</Button>}
          </div>
          <div className={styles.description}>
            <p>
              D-Pad: Arrows, Start: Enter, Select: Right Shift, Button A: S, Button B: A, Turbo A:
              X, Turbo B: Z. Pause Game: P, Mute: M.
            </p>
            <p>Also you can drag and drop a ROM file onto the page to play it.</p>
          </div>
          {localRoms.length > 0 && (
            <LocalRomsList list={localRoms} removeRomHandler={removeRomHandler} />
          )}
          <GamesSwiper />
        </Container>
      </div>
    </PageLayout>
  );
};

export default Emulator;
