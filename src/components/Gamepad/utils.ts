import { BUTTONS, Buttons } from '@/types';

export const getButtons = (e: TouchEvent, dPadRect: DOMRect | null): Buttons[] => {
  const touch = e.targetTouches[0];
  const buttons: Buttons[] = [];

  if (!dPadRect) {
    return buttons;
  }

  const dPadX = dPadRect?.left ?? 0;
  const dPadY = dPadRect?.top ?? 0;
  const posX = touch.clientX - dPadX;
  const posY = touch.clientY - dPadY;

  if (posY < 57) {
    buttons.push(BUTTONS.UP);
  }
  if (posX > 93) {
    buttons.push(BUTTONS.RIGHT);
  }
  if (posY > 93) {
    buttons.push(BUTTONS.DOWN);
  }
  if (posX < 57) {
    buttons.push(BUTTONS.LEFT);
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
