import { useState, useCallback, type TouchEvent, memo } from 'react';
import { Buttons } from '@/types';
import { getButtons, onKeyDown, onKeyUp } from './utils';
import styles from './Dpad.module.scss';

const Dpad = memo(() => {
  const [activeButtons, setActiveButtons] = useState<Buttons[]>([]);

  const joystickStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    const buttons = getButtons(e);
    setActiveButtons(buttons);
    buttons.forEach((button) => {
      onKeyDown(button);
    });
  }, []);

  const joystickMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const buttons = getButtons(e);

      const newButtons = buttons.filter((button) => !activeButtons.includes(button));
      const cancelButtons = activeButtons.filter((button) => !buttons.includes(button));

      newButtons.forEach((button) => onKeyDown(button));
      cancelButtons.forEach((button) => onKeyUp(button));

      if (!!newButtons.length || !!cancelButtons.length) {
        setActiveButtons(buttons);
      }
    },
    [activeButtons]
  );

  const joystickEnd = useCallback(() => {
    setActiveButtons((prev) => {
      prev.forEach((button) => {
        onKeyUp(button);
      });

      return [];
    });
  }, []);

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
