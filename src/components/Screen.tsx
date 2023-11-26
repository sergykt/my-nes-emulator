import { forwardRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from '../hooks';
import { startGame } from '../store/emulatorSlice';
import { nesLoadData } from '../nes_engine';
import Controller from './Controller';
import type { IFullScreenElement } from '../types';

interface IScreenProps {
  pauseHandler: () => void;
  fullScreenHandler: () => void;
}

const Screen = forwardRef<IFullScreenElement, IScreenProps>(({ pauseHandler, fullScreenHandler }, ref) => {
  const dispatch = useAppDispatch();
  const { gameRom, isStarted, isFullScreen, isPaused } = useAppSelector((state) => state.emulator);

  const startHandler = (): void => {
    nesLoadData('game', gameRom);
    dispatch(startGame());
  };

  return (
    <div className={isFullScreen ? 'emulator__screen-wrapper fullscreen' : 'emulator__screen-wrapper'} ref={ref}>
      <canvas className="emulator__screen" id="game" width={256} height={240} />
      {!isStarted && gameRom !== '' && <button className="emulator__start-button" type="button" onClick={startHandler}>Start Game</button>}
      {isMobile && isStarted && isFullScreen && <Controller />}
      {isMobile && isFullScreen && <button className="emulator__fs-button-close" onClick={fullScreenHandler} type="button" aria-label="close">
        <svg width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0" />
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
          <g id="SVGRepo_iconCarrier">
            <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z" />
          </g>
        </svg>
      </button>}
      {isMobile && isFullScreen && isStarted && <button className="emulator__pause-button" onClick={pauseHandler} type="button" aria-label="pause resume">
        {!isPaused
          ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g id="pause_circle" data-name="pause circle"><path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10,10,0,0,1,12,22Z" />
              <path d="M14,8v8a1,1,0,0,0,2,0V8A1,1,0,0,0,14,8Z" /><path d="M8,8v8a1,1,0,0,0,2,0V8A1,1,0,0,0,8,8Z" />
            </g>
          </svg>
          : <svg height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M413.974,71.026C368.171,25.225,307.274,0,242.5,0S116.829,25.225,71.026,71.026C25.225,116.829,0,177.726,0,242.5 s25.225,125.671,71.026,171.474C116.829,459.775,177.726,485,242.5,485s125.671-25.225,171.474-71.026 C459.775,368.171,485,307.274,485,242.5S459.775,116.829,413.974,71.026z M242.5,455C125.327,455,30,359.673,30,242.5 S125.327,30,242.5,30S455,125.327,455,242.5S359.673,455,242.5,455z" />
                <polygon points="181.062,336.575 343.938,242.5 181.062,148.425 " />
              </g>
            </g>
          </svg>}
      </button>}
    </div>
  )
});

export default Screen;
