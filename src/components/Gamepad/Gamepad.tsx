import { type FC, memo, useCallback } from 'react';
import { Buttons } from '@/types';
import { onKeyDown, onKeyUp } from './utils';
import styles from './Gamepad.module.scss';
import Dpad from './Dpad';

const Gamepad: FC = memo(() => {
  const touchStart = useCallback((keyCode: number) => () => onKeyDown(keyCode), []);
  const touchEnd = useCallback((keyCode: number) => () => onKeyUp(keyCode), []);

  return (
    <div className={styles.gamepad}>
      <Dpad />
      <div className={styles.right}>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={touchStart(Buttons.TurboB)}
            onTouchEnd={touchEnd(Buttons.TurboB)}
            className={styles.buttonTurbo}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={touchStart(Buttons.TurboA)}
            onTouchEnd={touchEnd(Buttons.TurboA)}
            className={styles.buttonTurbo}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={touchStart(Buttons.B)}
            onTouchEnd={touchEnd(Buttons.B)}
            className={styles.button}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={touchStart(Buttons.A)}
            onTouchEnd={touchEnd(Buttons.A)}
            className={styles.button}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={touchStart(Buttons.Select)}
            onTouchEnd={touchEnd(Buttons.Select)}
            id='select'
            className={styles.selectButton}
            aria-label='select'
            type='button'
          />
          <button
            onTouchStart={touchStart(Buttons.Start)}
            onTouchEnd={touchEnd(Buttons.Start)}
            id='start'
            className={styles.selectButton}
            aria-label='start'
            type='button'
          />
        </div>
      </div>
    </div>
  );
});

export default Gamepad;
