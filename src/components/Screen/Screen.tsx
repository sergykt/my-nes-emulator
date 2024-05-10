/* eslint-disable no-void */
import { useEffect, type FC, useRef, useCallback, useState, memo } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { startGame, toggleVolume, setFullScreen } from '@store/emulatorSlice';
import { nesLoadData } from '@/engine';
import Alert from '@/components/Alert';
import Gamepad from '@components/Gamepad';
import Button from '@components/Button';
import { AlertType } from '@/types';
import {
  BsPlayCircle,
  BsPauseCircle,
  BsFillVolumeDownFill,
  BsFillVolumeMuteFill,
} from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import styles from './Screen.module.scss';

interface IScreenProps {
  pauseHandler: () => void;
}

const Screen: FC<IScreenProps> = memo(({ pauseHandler }) => {
  const screenWrapperRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const { gameRom, isStarted, isFullScreen, isPaused, isMuted } = useAppSelector(
    (state) => state.emulator
  );

  const [alertType, setAlertType] = useState<AlertType | null>(null);

  const startHandler = useCallback(() => {
    nesLoadData('game', gameRom);
    dispatch(startGame());
  }, [gameRom]);

  const volumeHandler = useCallback(() => {
    setAlertType(isMuted ? AlertType.UNMUTE : AlertType.MUTE);
    dispatch(toggleVolume());
  }, [isMuted]);

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
  }, [isStarted, volumeHandler]);

  const screenClassName = classNames(styles.screen, {
    [styles.fullscreen]: isFullScreen,
  });

  return (
    <div className={screenClassName} ref={screenWrapperRef}>
      <canvas className={styles.canvas} id='game' width={256} height={240} />
      {!!alertType && <Alert type={alertType} />}
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
            {isMuted ? <BsFillVolumeMuteFill /> : <BsFillVolumeDownFill />}
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
