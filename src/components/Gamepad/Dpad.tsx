import { useState, memo, useEffect, useRef } from 'react';
import { Buttons } from '@/types';
import { getButtons, onKeyDown, onKeyUp } from './utils';
import styles from './Dpad.module.scss';

const Dpad = memo(() => {
  const [, setActiveButtons] = useState(new Set<Buttons>());
  const dpadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const joystickStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const buttons = getButtons(e);
      setActiveButtons(buttons);
      buttons.forEach((button) => {
        onKeyDown(button);
      });
    };

    const joystickEnd = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveButtons((prev) => {
        prev.forEach((button) => {
          onKeyUp(button);
        });

        return new Set<Buttons>();
      });
    };

    const joystickMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const buttons = getButtons(e);

      setActiveButtons((prevButtons) => {
        const addedButtons = Array.from(buttons).filter((button) => !prevButtons.has(button));
        const removedButtons = Array.from(prevButtons).filter((button) => !buttons.has(button));

        addedButtons.forEach((button) => onKeyDown(button));
        removedButtons.forEach((button) => onKeyUp(button));

        return buttons;
      });
    };

    dpadRef.current?.addEventListener('touchstart', joystickStart, { passive: false });
    dpadRef.current?.addEventListener('touchend', joystickEnd, { passive: false });
    dpadRef.current?.addEventListener('touchmove', joystickMove, { passive: false });

    return () => {
      dpadRef.current?.removeEventListener('touchstart', joystickStart);
      dpadRef.current?.removeEventListener('touchend', joystickEnd);
      dpadRef.current?.removeEventListener('touchmove', joystickMove);
    };
  }, []);

  return <div className={styles.dpad} role='button' aria-label='d-pad' ref={dpadRef} />;
});

export default Dpad;
