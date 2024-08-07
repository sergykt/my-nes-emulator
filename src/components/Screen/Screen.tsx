/* eslint-disable no-void */
import { useEffect, type FC, useRef, useCallback, useState, memo } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector, useDebounce, useLatest } from '@/hooks';
import { startGame, toggleVolume, setFullScreen } from '@store/emulatorSlice';
import { nesLoadData } from '@/engine';
import Alert from '@/components/Alert';
import Gamepad from '@components/Gamepad';
import Button from '@components/Button';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { RiVolumeMuteFill, RiVolumeUpFill } from 'react-icons/ri';
import { SlClose } from 'react-icons/sl';
import styles from './Screen.module.scss';

interface IScreenProps {
  pauseHandler: () => void;
}

const Screen: FC<IScreenProps> = memo(({ pauseHandler }) => {
  const screenWrapperRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { gameRom, isStarted, isFullScreen, isPaused, isMuted, alertType } = useAppSelector(
    (state) => state.emulator
  );

  const [cursorHidden, setCursorHidden] = useState<boolean>(true);
  const cursorHiddenLatest = useLatest(cursorHidden);

  const startHandler = useCallback(() => {
    nesLoadData('game', gameRom);
    dispatch(startGame());
  }, [gameRom]);

  const volumeHandler = useCallback(() => {
    dispatch(toggleVolume());
  }, []);

  const exitFullScreenHandler = useCallback(() => {
    dispatch(setFullScreen(false));
  }, []);

  useEffect(() => {
    const onFullScreenChange = () => {
      dispatch(setFullScreen(Boolean(document.fullscreenElement)));
    };
    document.addEventListener('fullscreenchange', onFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const screenWrapper = screenWrapperRef.current;

    if (screenWrapper && isFullScreen && screenWrapper.requestFullscreen) {
      void screenWrapper.requestFullscreen();
    } else if (document.fullscreenElement && document.exitFullscreen) {
      void document.exitFullscreen();
    }
  }, [isFullScreen]);

  useEffect(() => {
    const pauseOnKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyP') {
        pauseHandler();
      }
    };

    const muteOnKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyM') {
        volumeHandler();
      }
    };

    if (isStarted) {
      document.body.addEventListener('keydown', pauseOnKeyDown);
      document.body.addEventListener('keydown', muteOnKeyDown);
    }

    return () => {
      document.body.removeEventListener('keydown', pauseOnKeyDown);
      document.body.removeEventListener('keydown', muteOnKeyDown);
    };
  }, [isStarted, volumeHandler, pauseHandler]);

  const handleHideCursor = useDebounce(() => {
    setCursorHidden(true);
  }, 4000);

  const onMouseMove = useCallback(() => {
    if (cursorHiddenLatest.current) {
      setCursorHidden(false);
    }
    handleHideCursor();
  }, [handleHideCursor]);

  const screenClassName = classNames(styles.screen, {
    [styles.fullscreen]: isFullScreen,
    [styles.cursorNone]: isFullScreen && cursorHidden && isStarted,
  });

  return (
    <div className={screenClassName} ref={screenWrapperRef} onMouseMove={onMouseMove}>
      <canvas className={styles.canvas} id='game' width={256} height={240} />
      <Alert type={alertType} />
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
              {!isPaused ? <BsPauseCircle /> : <BsPlayCircle />}
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
