import { memo, useEffect, useRef } from 'react';
import { Buttons } from '@/types';
import { getButtons, onKeyDown, onKeyUp } from './utils';
import styles from './Dpad.module.scss';

const Dpad = memo(() => {
  const dpadRef = useRef<HTMLDivElement>(null);
  const dpadRectRef = useRef<DOMRect | null>(null);
  const activeButtonsRef = useRef<Buttons[]>([]);

  useEffect(() => {
    const joystickStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!dpadRef.current) {
        return;
      }

      dpadRectRef.current = dpadRef.current.getBoundingClientRect();

      const buttons = getButtons(e, dpadRectRef.current);
      buttons.forEach(onKeyDown);
      activeButtonsRef.current = buttons;
    };

    const joystickEnd = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      activeButtonsRef.current.forEach(onKeyUp);
      activeButtonsRef.current = [];
    };

    const joystickMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const buttons = getButtons(e, dpadRectRef.current);
      const addedButtons = buttons.filter((b) => !activeButtonsRef.current.includes(b));
      const removedButtons = activeButtonsRef.current.filter((b) => !buttons.includes(b));

      addedButtons.forEach(onKeyDown);
      removedButtons.forEach(onKeyUp);
      activeButtonsRef.current = buttons;
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
