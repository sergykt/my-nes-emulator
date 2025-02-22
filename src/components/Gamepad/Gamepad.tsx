import { memo } from 'react';
import classNames from 'clsx';
import { BUTTONS } from '@/types';
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
            onTouchStart={() => onKeyDown(BUTTONS.TURBO_B)}
            onTouchEnd={() => onKeyUp(BUTTONS.TURBO_B)}
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={() => onKeyDown(BUTTONS.TURBO_A)}
            onTouchEnd={() => onKeyUp(BUTTONS.TURBO_A)}
            className={classNames(styles.button, styles.buttonTurbo)}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={() => onKeyDown(BUTTONS.B)}
            onTouchEnd={() => onKeyUp(BUTTONS.B)}
            className={styles.button}
            type='button'
          >
            B
          </button>
          <button
            onTouchStart={() => onKeyDown(BUTTONS.A)}
            onTouchEnd={() => onKeyUp(BUTTONS.A)}
            className={styles.button}
            type='button'
          >
            A
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button
            onTouchStart={() => onKeyDown(BUTTONS.SELECT)}
            onTouchEnd={() => onKeyUp(BUTTONS.SELECT)}
            id='select'
            className={styles.selectButton}
            aria-label='select'
            type='button'
          />
          <button
            onTouchStart={() => onKeyDown(BUTTONS.START)}
            onTouchEnd={() => onKeyUp(BUTTONS.START)}
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
