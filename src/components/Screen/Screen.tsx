import { useEffect, type FC, useRef, useCallback, memo } from 'react';
import { isMobile, isIOS, isSafari } from 'react-device-detect';
import classNames from 'clsx';
import { useEmulatorStore } from '@/store';
import { useCursor } from '@/hooks';
import { BUTTONS } from '@/types';
import Alert from '@/components/Alert';
import Gamepad from '@/components/Gamepad';
import Button from '@/components/Button';
import styles from './Screen.module.scss';
import MobileControls from '../MobileControls';

interface ScreenProps {
  pauseHandler: () => void;
}

const Screen: FC<ScreenProps> = memo(({ pauseHandler }) => {
  const screenWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    NES,
    gameRom,
    isStarted,
    isMuted,
    isPaused,
    isFullScreen,
    startGame,
    toggleVolume,
    setFullScreen,
    initNES,
  } = useEmulatorStore();

  const { cursorHidden, onMouseMove } = useCursor();

  const startHandler = useCallback(async () => {
    if (NES && gameRom) {
      NES.loadRom(gameRom);
      await NES.startGame();
    }
    startGame();
  }, [gameRom, NES]);

  const volumeHandler = useCallback(() => {
    toggleVolume();
    NES?.toggleVolume();
  }, [NES]);

  const exitFullScreenHandler = useCallback(() => {
    setFullScreen(false);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      initNES({
        canvasEl: canvasRef.current,
        buttons: BUTTONS,
      });
    }
  }, []);

  useEffect(() => {
    const onFullScreenChange = () => {
      setFullScreen(Boolean(document.fullscreenElement));
    };

    const gestureStart = (e: Event) => {
      e.preventDefault();
    };

    const gestureEnd = (e: Event) => {
      e.preventDefault();
    };

    const gestureChange = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener('fullscreenchange', onFullScreenChange);
    if (isIOS || isSafari) {
      document.addEventListener('gesturestart', gestureStart, { passive: false });
      document.addEventListener('gestureend', gestureEnd, { passive: false });
      document.addEventListener('gesturechange', gestureChange, { passive: false });
    }

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
      if (isIOS || isSafari) {
        document.removeEventListener('gesturestart', gestureStart);
        document.removeEventListener('gestureend', gestureEnd);
        document.removeEventListener('gesturechange', gestureChange);
      }
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

  const screenClassName = classNames(styles.screen, {
    [styles.fullscreen]: isFullScreen,
    [styles.cursorNone]: isFullScreen && cursorHidden && isStarted,
  });

  return (
    <div className={screenClassName} ref={screenWrapperRef} onMouseMove={onMouseMove}>
      <canvas className={styles.canvas} id='game' width={256} height={240} ref={canvasRef} />
      <Alert />
      {!isStarted && gameRom && (
        <Button className={styles.startButton} onClick={startHandler}>
          Start Game
        </Button>
      )}
      {isMobile && isStarted && isFullScreen && <Gamepad />}
      {isMobile && isFullScreen && (
        <MobileControls
          isStarted={isStarted}
          isPaused={isPaused}
          isMuted={isMuted}
          volumeHandler={volumeHandler}
          pauseHandler={pauseHandler}
          exitFullScreenHandler={exitFullScreenHandler}
        />
      )}
    </div>
  );
});

export default Screen;
