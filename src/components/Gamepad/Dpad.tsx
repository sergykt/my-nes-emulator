import { useState, type TouchEvent, memo } from 'react';
import { Buttons } from '@/types';
import { getButtons, onKeyDown, onKeyUp } from './utils';
import styles from './Dpad.module.scss';

const Dpad = memo(() => {
  const [activeButtons, setActiveButtons] = useState(new Set<Buttons>());

  const joystickStart = (e: TouchEvent<HTMLDivElement>) => {
    const buttons = getButtons(e);
    setActiveButtons(buttons);
    buttons.forEach((button) => {
      onKeyDown(button);
    });
  };

  const joystickMove = (e: TouchEvent<HTMLDivElement>) => {
    const buttons = getButtons(e);

    const addedButtons = Array.from(buttons).filter((button) => !activeButtons.has(button));
    const removedButtons = Array.from(activeButtons).filter((button) => !buttons.has(button));

    addedButtons.forEach((button) => onKeyDown(button));
    removedButtons.forEach((button) => onKeyUp(button));

    if (addedButtons.length > 0 || removedButtons.length > 0) {
      setActiveButtons(buttons);
    }
  };

  const joystickEnd = () => {
    setActiveButtons((prev) => {
      prev.forEach((button) => {
        onKeyUp(button);
      });

      return new Set<Buttons>();
    });
  };

  return (
    <div
      className={styles.dpad}
      onTouchStart={joystickStart}
      onTouchEnd={joystickEnd}
      onTouchMove={joystickMove}
      role='button'
      aria-label='d-pad'
    />
  );
});

export default Dpad;
