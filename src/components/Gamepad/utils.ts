import { type TouchEvent } from 'react';
import { Buttons } from '@/types';

export const getButtons = (e: TouchEvent<HTMLDivElement>): Buttons[] => {
  const touch = e.targetTouches[0];
  const dPadRect = e.currentTarget.getBoundingClientRect();
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

export const onKeyDown = (keyCode: number) => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode,
    })
  );
};

export const onKeyUp = (keyCode: number) => {
  document.dispatchEvent(
    new KeyboardEvent('keyup', {
      keyCode,
    })
  );
};
