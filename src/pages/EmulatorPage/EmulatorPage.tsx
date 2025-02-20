import type { FC, DragEvent, ChangeEvent } from 'react';
import { useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useEmulatorStore, useRomStore } from '@/store';
import { nesToggleStart } from '@/engine';
import games from '@/engine/games';
import PageLayout from '@/components/PageLayout';
import Screen from '@/components/Screen';
import GamesSwiper from '@/components/GamesSwiper';
import LocalRomsList from '@/components/LocalRomsList';
import Button from '@/components/Button';
import InputButton from '@/components/InputFileButton';
import Container from '@/components/Container';
import styles from './EmulatorPage.module.scss';

const EmulatorPage: FC = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const {
    gameName,
    isStarted,
    isPaused,
    setGameName,
    setGameRom,
    setFullScreen,
    fetchRom,
    togglePause,
  } = useEmulatorStore();

  const { saveRom, getRomById } = useRomStore();

  useEffect(() => {
    const getRom = async () => {
      const gameNameLink = params.id;
      const idQuery = searchParams.get('id');

      if (idQuery && gameNameLink === 'local') {
        const localRom = getRomById(idQuery);
        if (localRom) {
          setGameName(localRom.name);
          setGameRom(localRom.romData);
        } else {
          setGameName('Not found');
        }
      } else {
        const currentGame = games.find((item) => item.shortName === gameNameLink);
        if (currentGame) {
          const { name, shortName } = currentGame;
          const romPath = `/games/${shortName}.nes`;
          await fetchRom(romPath);
          setGameName(name);
        } else {
          setGameName('Not found');
        }
      }
    };

    getRom().catch(console.error);
  }, []);

  const pauseHandler = useCallback(() => {
    nesToggleStart();
    togglePause();
  }, []);

  const fullScreenHandler = useCallback(() => {
    setFullScreen(true);
  }, []);

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0];
    if (file) {
      saveRom(file).catch(console.error);
    }
  };

  const uploadRomHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      saveRom(file).catch(console.error);
    }
  }, []);

  return (
    <PageLayout>
      <div
        className={styles.emulator}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      >
        <Container className={styles.container}>
          <h1 className={styles.gameName}>{gameName}</h1>
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
            <p>Also you can upload a ROM file to play it.</p>
          </div>
          <InputButton
            className={styles.inputFile}
            accept='.nes'
            name='rom'
            id='rom'
            title='Upload ROM'
            onChange={uploadRomHandler}
          />
          <LocalRomsList />
          <GamesSwiper />
        </Container>
      </div>
    </PageLayout>
  );
};

export default EmulatorPage;
