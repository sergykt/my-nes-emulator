import { useEffect, type FC, useRef, useCallback, useState, memo } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'clsx';
import { SlClose } from 'react-icons/sl';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { useEmulatorStore } from '@/store';
import { useDebounce, useLatest } from '@/hooks';
import { nesLoadData, toggleSound } from '@/engine';
import Alert from '@/components/Alert';
import Gamepad from '@/components/Gamepad';
import Button from '@/components/Button';
import styles from './Screen.module.scss';

interface ScreenProps {
  pauseHandler: () => void;
}

const Screen: FC<ScreenProps> = memo(({ pauseHandler }) => {
  const screenWrapperRef = useRef<HTMLDivElement | null>(null);
  const {
    gameRom,
    isStarted,
    isMuted,
    isPaused,
    isFullScreen,
    startGame,
    toggleVolume,
    setFullScreen,
  } = useEmulatorStore();

  const [cursorHidden, setCursorHidden] = useState<boolean>(true);
  const cursorHiddenLatest = useLatest(cursorHidden);

  const startHandler = useCallback(() => {
    nesLoadData('game', gameRom);
    startGame();
  }, [gameRom]);

  const volumeHandler = () => {
    toggleVolume();
    toggleSound();
  };

  const exitFullScreenHandler = () => {
    setFullScreen(false);
  };

  useEffect(() => {
    const onFullScreenChange = () => {
      setFullScreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const toggleFullScreen = async () => {
      const screenWrapper = screenWrapperRef.current;
      if (screenWrapper && isFullScreen && screenWrapper.requestFullscreen) {
        await screenWrapper.requestFullscreen();
      } else if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    };

    toggleFullScreen().catch(console.error);
  }, [isFullScreen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') {
        pauseHandler();
      } else if (e.code === 'KeyM') {
        volumeHandler();
      }
    };

    if (isStarted) {
      document.body.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.body.removeEventListener('keydown', onKeyDown);
    };
  }, [isStarted, pauseHandler]);

  const handleHideCursor = useDebounce(() => {
    setCursorHidden(true);
  }, 4000);

  const onMouseMove = () => {
    if (cursorHiddenLatest.current) {
      setCursorHidden(false);
    }
    handleHideCursor();
  };

  const screenClassName = classNames(styles.screen, {
    [styles.fullscreen]: isFullScreen,
    [styles.cursorNone]: isFullScreen && cursorHidden && isStarted,
  });

  return (
    <div className={screenClassName} ref={screenWrapperRef} onMouseMove={onMouseMove}>
      <canvas className={styles.canvas} id='game' width={256} height={240} />
      <Alert />
      {!isStarted && gameRom && (
        <Button className={styles.startButton} onClick={startHandler}>
          Start Game
        </Button>
      )}
      {isMobile && isStarted && isFullScreen && <Gamepad />}
      {isMobile && isFullScreen && (
        <div className={styles.controls}>
          <button
            className={styles.controlsButton}
            onClick={volumeHandler}
            type='button'
            aria-label='sound button'
          >
            {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpFill />}
          </button>
          {isStarted && (
            <button
              className={styles.controlsButton}
              onClick={pauseHandler}
              type='button'
              aria-label='pause button'
            >
              {isPaused ? <BsPlayCircle /> : <BsPauseCircle />}
            </button>
          )}
          <button
            className={styles.controlsButton}
            onClick={exitFullScreenHandler}
            type='button'
            aria-label='close'
          >
            <SlClose />
          </button>
        </div>
      )}
    </div>
  );
});

export default Screen;
