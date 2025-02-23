import { memo, useEffect, useRef } from 'react';
import classNames from 'clsx';
import { Buttons, BUTTONS } from '@/types';
import { onKeyDown, onKeyUp } from './utils';
import Dpad from './Dpad';
import styles from './Gamepad.module.scss';

const Gamepad = memo(() => {
  const buttonARef = useRef<HTMLButtonElement>(null);
  const buttonBRef = useRef<HTMLButtonElement>(null);
  const turboButtonARef = useRef<HTMLButtonElement>(null);
  const turboButtonBRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const selectButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const buttons = [
      { ref: buttonARef, button: BUTTONS.A },
      { ref: buttonBRef, button: BUTTONS.B },
      { ref: turboButtonARef, button: BUTTONS.TURBO_A },
      { ref: turboButtonBRef, button: BUTTONS.TURBO_B },
      { ref: startButtonRef, button: BUTTONS.START },
      { ref: selectButtonRef, button: BUTTONS.SELECT },
    ];

    const handleTouchStart = (button: Buttons) => (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onKeyDown(button);
    };

    const handleTouchEnd = (button: Buttons) => (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onKeyUp(button);
    };

    buttons.forEach(({ ref, button }) => {
      const element = ref.current;
      if (element) {
        element.addEventListener('touchstart', handleTouchStart(button), { passive: false });
        element.addEventListener('touchend', handleTouchEnd(button), { passive: false });
      }
    });

    return () => {
      buttons.forEach(({ ref, button }) => {
        const element = ref.current;
        if (element) {
          element.removeEventListener('touchstart', handleTouchStart(button));
          element.removeEventListener('touchend', handleTouchEnd(button));
        }
      });
    };
  }, []);

  return (
    <div className={styles.gamepad}>
      <Dpad />
      <div className={styles.right}>
        <div className={styles.buttonGroup}>
          <button
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
            ref={turboButtonBRef}
          >
            B
          </button>
          <button
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
            ref={turboButtonARef}
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} type='button' ref={buttonBRef}>
            B
          </button>
          <button className={styles.button} type='button' ref={buttonARef}>
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            id='select'
            className={styles.selectButton}
            aria-label='select'
            type='button'
            ref={selectButtonRef}
          />
          <button
            id='start'
            className={styles.selectButton}
            aria-label='start'
            type='button'
            ref={startButtonRef}
          />
        </div>
      </div>
    </div>
  );
});

export default Gamepad;
