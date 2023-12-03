import type { FC, TouchEvent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Buttons } from '../types';

const Gamepad: FC = () => {
  const [isActive, setActive] = useState(false);
  const [prevButtons, setPrevButtons] = useState<Buttons[]>([]);
  const [activeButtons, setActiveButtons] = useState<Buttons[]>([]);
  const dPadEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      const newButtons = activeButtons.filter((button) => !prevButtons.includes(button));
      const cancelButtons = prevButtons.filter((button) => !activeButtons.includes(button));
      newButtons.forEach((button) => {
        const keyBoardEvent = new KeyboardEvent('keydown', {
          keyCode: button,
        });
        document.dispatchEvent(keyBoardEvent);
      });

      cancelButtons.forEach((button) => {
        const keyBoardEvent = new KeyboardEvent('keyup', {
          keyCode: button,
        });
        document.dispatchEvent(keyBoardEvent);
      });
    }

    if (!isActive && activeButtons.length > 0) {
      activeButtons.forEach((button) => {
        const keyBoardEvent = new KeyboardEvent('keyup', {
          keyCode: button,
        });
        document.dispatchEvent(keyBoardEvent);
      });

      setPrevButtons([]);
      setActiveButtons([]);
    }
  }, [activeButtons, prevButtons, isActive]);

  const touchStart = (keyCode: number) => () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { keyCode }));
  };

  const touchEnd = (keyCode: number) => () => {
    document.dispatchEvent(new KeyboardEvent('keyup', { keyCode }));
  };

  const getButtons = (e: TouchEvent<HTMLDivElement>): Buttons[] => {
    const touch = e.targetTouches[0];
    const dPadRect = dPadEl.current?.getBoundingClientRect();
    const dPadX = dPadRect?.left ?? 0;
    const dPadY = dPadRect?.top ?? 0;
    const posX = touch.clientX - dPadX;
    const posY = touch.clientY - dPadY;

    const buttons: Buttons[] = [];

    if (posY < 57) {
      buttons.push(Buttons.Up);
    }
    if (posX > 93) {
      buttons.push(Buttons.Right);
    }
    if (posY > 93) {
      buttons.push(Buttons.Down);
    }
    if (posX < 57) {
      buttons.push(Buttons.Left);
    }

    return buttons;
  };

  const joystickStart = (e: TouchEvent<HTMLDivElement>) => {
    const buttons = getButtons(e);
    setActive(true);
    setActiveButtons(buttons);
  };

  const joystickMove = (e: TouchEvent<HTMLDivElement>) => {
    const buttons = getButtons(e);
    setActiveButtons(buttons);
    setPrevButtons(activeButtons);
  };

  const joystickEnd = () => {
    setActive(false);
  };

  return (
    <div className='gamepad'>
      <div
        className='gamepad__dpad'
        onTouchStart={joystickStart}
        onTouchEnd={joystickEnd}
        onTouchMove={joystickMove}
        ref={dPadEl}
        role='button'
        aria-label='d-pad'
      />
      <div className='gamepad__right'>
        <div className='gamepad__button-group'>
          <button
            onTouchStart={touchStart(Buttons.TurboB)}
            onTouchEnd={touchEnd(Buttons.TurboB)}
            className='gamepad__button gamepad__button_turbo'
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={touchStart(Buttons.TurboA)}
            onTouchEnd={touchEnd(Buttons.TurboA)}
            className='gamepad__button gamepad__button_turbo'
            type='button'
          >
            A
          </button>
        </div>
        <div className='gamepad__button-group'>
          <button
            onTouchStart={touchStart(Buttons.B)}
            onTouchEnd={touchEnd(Buttons.B)}
            className='gamepad__button'
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={touchStart(Buttons.A)}
            onTouchEnd={touchEnd(Buttons.A)}
            className='gamepad__button'
            type='button'
          >
            A
          </button>
        </div>
        <div className='gamepad__button-group'>
          <button
            onTouchStart={touchStart(Buttons.Select)}
            onTouchEnd={touchEnd(Buttons.Select)}
            id='select'
            className='gamepad__select-button'
            aria-label='select'
            type='button'
          />
          <button
            onTouchStart={touchStart(Buttons.Start)}
            onTouchEnd={touchEnd(Buttons.Start)}
            id='start'
            className='gamepad__select-button'
            aria-label='start'
            type='button'
          />
        </div>
      </div>
    </div>
  );
};

export default Gamepad;
