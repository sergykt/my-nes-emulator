import { BUTTONS, Buttons } from '@/types';

// These values were chosen based on the D-pad design and may need adjustments for different sizes or layouts
const leftUpTriggerSize = 57;
const rightDownTriggerSize = 93;

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

  if (posY < leftUpTriggerSize) {
    buttons.push(BUTTONS.UP);
  }
  if (posX > rightDownTriggerSize) {
    buttons.push(BUTTONS.RIGHT);
  }
  if (posY > rightDownTriggerSize) {
    buttons.push(BUTTONS.DOWN);
  }
  if (posX < leftUpTriggerSize) {
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
