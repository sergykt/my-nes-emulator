import { useState, memo, useEffect, useRef } from 'react';
import { Buttons } from '@/types';
import { getButtons, onKeyDown, onKeyUp } from './utils';
import styles from './Dpad.module.scss';

const Dpad = memo(() => {
  const [, setActiveButtons] = useState<Buttons[]>([]);
  const dpadRef = useRef<HTMLDivElement>(null);
  const dpadRectRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const invalidateRect = () => {
      dpadRectRef.current = null;
    };

    const joystickStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (dpadRef.current) {
        dpadRectRef.current = dpadRef.current.getBoundingClientRect();
      }

      const buttons = getButtons(e, dpadRectRef.current);
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

        return [];
      });
    };

    const joystickMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const buttons = getButtons(e, dpadRectRef.current);

      setActiveButtons((prevButtons) => {
        const addedButtons = buttons.filter((button) => !prevButtons.includes(button));
        const removedButtons = prevButtons.filter((button) => !buttons.includes(button));

        addedButtons.forEach((button) => onKeyDown(button));
        removedButtons.forEach((button) => onKeyUp(button));

        return buttons;
      });
    };

    dpadRef.current?.addEventListener('touchstart', joystickStart, { passive: false });
    dpadRef.current?.addEventListener('touchend', joystickEnd, { passive: false });
    dpadRef.current?.addEventListener('touchmove', joystickMove, { passive: false });
    window.addEventListener('resize', invalidateRect);

    return () => {
      dpadRef.current?.removeEventListener('touchstart', joystickStart);
      dpadRef.current?.removeEventListener('touchend', joystickEnd);
      dpadRef.current?.removeEventListener('touchmove', joystickMove);
      window.removeEventListener('resize', invalidateRect);
    };
  }, []);

  return <div className={styles.dpad} role='button' aria-label='d-pad' ref={dpadRef} />;
});

export default Dpad;
