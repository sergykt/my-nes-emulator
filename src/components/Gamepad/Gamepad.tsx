import { memo } from 'react';
import classNames from 'clsx';
import { Buttons } from '@/types';
import { onKeyDown, onKeyUp } from './utils';
import Dpad from './Dpad';
import styles from './Gamepad.module.scss';

const Gamepad = memo(() => {
  return (
    <div className={styles.gamepad}>
      <Dpad />
      <div className={styles.right}>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={() => onKeyDown(Buttons.TurboB)}
            onTouchEnd={() => onKeyUp(Buttons.TurboB)}
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={() => onKeyDown(Buttons.TurboA)}
            onTouchEnd={() => onKeyUp(Buttons.TurboA)}
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={() => onKeyDown(Buttons.B)}
            onTouchEnd={() => onKeyUp(Buttons.B)}
            className={styles.button}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={() => onKeyDown(Buttons.A)}
            onTouchEnd={() => onKeyUp(Buttons.A)}
            className={styles.button}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={() => onKeyDown(Buttons.Select)}
            onTouchEnd={() => onKeyUp(Buttons.Select)}
            id='select'
            className={styles.selectButton}
            aria-label='select'
            type='button'
          />
          <button
            onTouchStart={() => onKeyDown(Buttons.Start)}
            onTouchEnd={() => onKeyUp(Buttons.Start)}
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
