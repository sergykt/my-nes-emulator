import { forwardRef } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';
import { useAppDispatch, useAppSelector } from '../hooks';
import { startGame } from '../store/emulatorSlice';
import { nesLoadData } from '../engine';
import type { IFullScreenElement } from '../types';
import Gamepad from './Gamepad';
import Button from './Button';

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

    const screenClassName = classNames('screen', { screen_fullscreen: isFullScreen });

    return (
      <div className={screenClassName} ref={ref}>
        <canvas className='screen__canvas' id='game' width={256} height={240} />
        {!isStarted && gameRom && (
          <Button className='screen__start-button' onClick={startHandler}>
            Start Game
          </Button>
        )}
        {isMobile && isStarted && isFullScreen && <Gamepad />}
        {isMobile && isFullScreen && (
          <div className='screen__controls'>
            {isStarted && (
              <button
                className='screen__controls-button'
                onClick={pauseHandler}
                type='button'
                aria-label='pause button'
              >
                {!isPaused ? <BsPauseCircle /> : <BsPlayCircle />}
              </button>
            )}
            <button
              className='screen__controls-button'
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
