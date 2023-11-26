/* eslint no-void: ["error", { "allowAsStatement": true }] */
import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setGameName, setFullScreen, togglePause, fetchRom } from '../store/emulatorSlice';
import { nesToggleStart } from '../nes_engine';
import games from '../nes_engine/games';
import type { IFullScreenElement } from '../types';
import Screen from '../components/Screen';
import GamesSwiper from '../components/GamesSwiper';

const Emulator: FC = () => {
  const dispatch = useAppDispatch();
  const { gameName, isStarted, isFullScreen, isPaused } = useAppSelector((state) => state.emulator);
  const screenWrapperRef = useRef<IFullScreenElement>(null);
  const location = useLocation();

  useEffect(() => {
    const pathArray = location.pathname.split('/');
    if (pathArray.length > 0) {
      const gameNameFromLink = pathArray[pathArray.length - 1];
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
  }, []);

  const pauseHandler = () => {
    nesToggleStart();
    dispatch(togglePause());
  };

  const fullScreenHandler = (): void => {
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

  return (
    <div className="emulator">
      <div className="container emulator__container">
        {gameName && <h1 className="emulator__game-name">{gameName}</h1>}
        <Screen
          ref={screenWrapperRef}
          fullScreenHandler={fullScreenHandler}
          pauseHandler={pauseHandler}
        />
        <div className="emulator__button-group">
          <button className="emulator__button" onClick={fullScreenHandler} type="button">
            Full Screen
          </button>
          {isStarted && (
            <button className="emulator__button" type="button" onClick={pauseHandler}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
        <p className="emulator__description">
          D-Pad: Arrows, Start: Enter, Select: Right Shift, Button A: S, Button B: A, Turbo A: X,
          Turbo B: Z
        </p>
        <GamesSwiper />
      </div>
    </div>
  );
};

export default Emulator;
