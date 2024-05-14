import { type TouchEvent } from 'react';
import { Buttons } from '@/types';

export const getButtons = (e: TouchEvent<HTMLDivElement>): Set<Buttons> => {
  const touch = e.targetTouches[0];
  const dPadRect = e.currentTarget.getBoundingClientRect();
  const dPadX = dPadRect?.left ?? 0;
  const dPadY = dPadRect?.top ?? 0;
  const posX = touch.clientX - dPadX;
  const posY = touch.clientY - dPadY;

  const buttons = new Set<Buttons>();

  if (posY < 57) {
    buttons.add(Buttons.Up);
  }
  if (posX > 93) {
    buttons.add(Buttons.Right);
  }
  if (posY > 93) {
    buttons.add(Buttons.Down);
  }
  if (posX < 57) {
    buttons.add(Buttons.Left);
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
