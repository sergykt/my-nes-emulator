/* eslint no-void: ["error", { "allowAsStatement": true }] */
import type { FC, DragEvent } from 'react';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  setGameName,
  setFullScreen,
  togglePause,
  fetchRom,
  setGameRom,
} from '@store/emulatorSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import RomService from '@services/RomService';
import type { IFullScreenElement, IRom } from '@src/types';
import { nesToggleStart } from '@src/engine';
import games from '@src/engine/games';
import Screen from '@components/Screen';
import GamesSwiper from '@components/GamesSwiper';
import LocalRomsList from '@components/LocalRomsList';
import Button from '@components/Button';
import Container from '@components/Container';

const Emulator: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { gameName, isStarted, isFullScreen, isPaused } = useAppSelector((state) => state.emulator);
  const screenWrapperRef = useRef<IFullScreenElement>(null);
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

    const onFullScreenChange = () => {
      dispatch(setFullScreen(Boolean(document.fullscreenElement)));
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, [location]);

  const pauseHandler = () => {
    nesToggleStart();
    dispatch(togglePause());
  };

  const fullScreenHandler = () => {
    const screenWrapper = screenWrapperRef.current;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else if (screenWrapper) {
      if (screenWrapper.requestFullscreen) {
        void screenWrapper.requestFullscreen();
      } else if (screenWrapper.mozRequestFullScreen) {
        void screenWrapper.mozRequestFullScreen();
      } else if (screenWrapper.webkitRequestFullscreen) {
        void screenWrapper.webkitRequestFullscreen();
      } else if (screenWrapper.msRequestFullscreen) {
        void screenWrapper.msRequestFullscreen();
      } else {
        dispatch(setFullScreen(!isFullScreen));
      }
    }
  };

  const dragHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const file = e.dataTransfer?.files[0];
      const romObj = await RomService.saveRom(file);
      setLocalRoms([...localRoms, romObj]);
    } catch (error) {
      console.error(error);
    }
  };

  const removeRomHandler = (id: number): void => {
    const result = RomService.removeRom(id);
    if (result) {
      setLocalRoms(RomService.getRoms());
    }
  };

  return (
    <div
      className='emulator'
      onDragEnter={dragHandler}
      onDragLeave={dragHandler}
      onDragOver={dragHandler}
      onDrop={dropHandler}
    >
      <Container className='emulator__container'>
        {gameName && <h1 className='emulator__game-name'>{gameName}</h1>}
        <Screen
          ref={screenWrapperRef}
          fullScreenHandler={fullScreenHandler}
          pauseHandler={pauseHandler}
        />
        <div className='emulator__button-group'>
          <Button onClick={fullScreenHandler}>Full Screen</Button>
          {isStarted && <Button onClick={pauseHandler}>{isPaused ? 'Resume' : 'Pause'}</Button>}
        </div>
        <div className='emulator__description'>
          <p>
            D-Pad: Arrows, Start: Enter, Select: Right Shift, Button A: S, Button B: A, Turbo A: X,
            Turbo B: Z.
          </p>
          <p>Also you can drag and drop a ROM file onto the page to play it.</p>
        </div>
        {localRoms.length > 0 && (
          <LocalRomsList list={localRoms} removeRomHandler={removeRomHandler} />
        )}
        <GamesSwiper />
      </Container>
    </div>
  );
};

export default Emulator;
