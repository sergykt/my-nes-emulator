import { type FC, type TouchEvent, memo, useCallback } from 'react';
import { useState } from 'react';
import { Buttons } from '@/types';
import styles from './Gamepad.module.scss';

const getButtons = (e: TouchEvent<HTMLDivElement>): Buttons[] => {
  const touch = e.targetTouches[0];
  const dPadRect = e.currentTarget.getBoundingClientRect();
  const dPadX = dPadRect?.left ?? 0;
  const dPadY = dPadRect?.top ?? 0;
  const posX = touch.clientX - dPadX;
  const posY = touch.clientY - dPadY;

  const buttons: Buttons[] = [];

  if (posY < 57) {
    buttons.push(Buttons.Up);
  }
  if (posX > 93) {
    buttons.push(Buttons.Right);
  }
  if (posY > 93) {
    buttons.push(Buttons.Down);
  }
  if (posX < 57) {
    buttons.push(Buttons.Left);
  }

  return buttons;
};

const onKeyDown = (keyCode: number) => {
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      keyCode,
    })
  );
};

const onKeyUp = (keyCode: number) => {
  document.dispatchEvent(
    new KeyboardEvent('keyup', {
      keyCode,
    })
  );
};

const Gamepad: FC = memo(() => {
  const [activeButtons, setActiveButtons] = useState<Buttons[]>([]);

  const touchStart = useCallback((keyCode: number) => () => onKeyDown(keyCode), []);
  const touchEnd = useCallback((keyCode: number) => () => onKeyUp(keyCode), []);

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
      buttons.forEach((button) => {
        if (!activeButtons.includes(button)) {
          onKeyDown(button);
        }
      });

      activeButtons.forEach((activeButton) => {
        if (!buttons.includes(activeButton)) {
          onKeyUp(activeButton);
        }
      });

      setActiveButtons(buttons);
    },
    [activeButtons]
  );

  const joystickEnd = useCallback(() => {
    activeButtons.forEach((button) => {
      onKeyUp(button);
    });
    setActiveButtons([]);
  }, [activeButtons]);

  return (
    <div className={styles.gamepad}>
      <div
        className={styles.dpad}
        onTouchStart={joystickStart}
        onTouchEnd={joystickEnd}
        onTouchMove={joystickMove}
        role='button'
        aria-label='d-pad'
      />
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
