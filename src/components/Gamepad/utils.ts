import { BUTTONS, Buttons } from '@/types';

export const getButtons = (e: TouchEvent): Set<Buttons> => {
  const touch = e.targetTouches[0];
  const dPadEl = e.currentTarget;
  if (!(dPadEl instanceof HTMLElement)) {
    return new Set<Buttons>();
  }
  const dPadRect = dPadEl.getBoundingClientRect();
  const dPadX = dPadRect?.left ?? 0;
  const dPadY = dPadRect?.top ?? 0;
  const posX = touch.clientX - dPadX;
  const posY = touch.clientY - dPadY;

  const buttons = new Set<Buttons>();

  if (posY < 57) {
    buttons.add(BUTTONS.UP);
  }
  if (posX > 93) {
    buttons.add(BUTTONS.RIGHT);
  }
  if (posY > 93) {
    buttons.add(BUTTONS.DOWN);
  }
  if (posX < 57) {
    buttons.add(BUTTONS.LEFT);
  }

  return buttons;
};

export const onKeyDown = (code: Buttons) => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      code,
    })
  );
};

export const onKeyUp = (code: Buttons) => {
  document.dispatchEvent(
    new KeyboardEvent('keyup', {
      code,
    })
  );
};
