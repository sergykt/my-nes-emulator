import { forwardRef } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@src/hooks';
import { startGame } from '@store/emulatorSlice';
import type { IFullScreenElement } from '@src/types';
import { nesLoadData } from '@src/engine';
import Gamepad from '@components/Gamepad';
import Button from '@components/Button';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import styles from './Screen.module.scss';

interface IScreenProps {
  pauseHandler: () => void;
  fullScreenHandler: () => void;
}

const Screen = forwardRef<IFullScreenElement, IScreenProps>(
  ({ pauseHandler, fullScreenHandler }, ref) => {
    const dispatch = useAppDispatch();
    const { gameRom, isStarted, isFullScreen, isPaused } = useAppSelector(
      (state) => state.emulator
    );

    const startHandler = () => {
      nesLoadData('game', gameRom);
      dispatch(startGame());
    };

    const screenClassName = classNames(styles.screen, { [styles.fullscreen]: isFullScreen });

    return (
      <div className={screenClassName} ref={ref}>
        <canvas className={styles.canvas} id='game' width={256} height={240} />
        {!isStarted && gameRom && (
          <Button className={styles.startButton} onClick={startHandler}>
            Start Game
          </Button>
        )}
        {isMobile && isStarted && isFullScreen && <Gamepad />}
        {isMobile && isFullScreen && (
          <div className={styles.controls}>
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
              onClick={fullScreenHandler}
              type='button'
              aria-label='close'
            >
              <SlClose />
            </button>
          </div>
        )}
      </div>
    );
  }
);

export default Screen;
