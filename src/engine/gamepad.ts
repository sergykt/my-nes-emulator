import { Controller } from 'jsnes';
import { type GamepadMethods, type GamepadButtons, type TurboState } from './types';

class Gamepad {
  handleDown: GamepadMethods['handleDown'];

  handleUp: GamepadMethods['handleUp'];

  buttons: GamepadButtons;

  private turboState: TurboState = {
    A: false,
    B: false,
    interval: null,
  };

  constructor(methods: GamepadMethods, buttons: GamepadButtons) {
    this.buttons = buttons;
    this.handleDown = methods.handleDown;
    this.handleUp = methods.handleUp;
  }

  private getButton(code: string) {
    switch (code) {
      case this.buttons.A:
        return Controller.BUTTON_A;
      case this.buttons.B:
        return Controller.BUTTON_B;
      case this.buttons.SELECT:
        return Controller.BUTTON_SELECT;
      case this.buttons.START:
        return Controller.BUTTON_START;
      case this.buttons.UP:
        return Controller.BUTTON_UP;
      case this.buttons.DOWN:
        return Controller.BUTTON_DOWN;
      case this.buttons.LEFT:
        return Controller.BUTTON_LEFT;
      case this.buttons.RIGHT:
        return Controller.BUTTON_RIGHT;
      default:
        return undefined;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === this.buttons.TURBO_A) {
      this.startTurbo('A');
    } else if (event.code === this.buttons.TURBO_B) {
      this.startTurbo('B');
    } else {
      const nesButton = this.getButton(event.code);
      if (nesButton === undefined) return;
      this.handleDown(nesButton);
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.code === this.buttons.TURBO_A) {
      this.stopTurbo('A');
    } else if (event.code === this.buttons.TURBO_B) {
      this.stopTurbo('B');
    } else {
      const nesButton = this.getButton(event.code);
      if (nesButton === undefined) return;
      this.handleUp(nesButton);
    }
  }

  private startTurbo(button: 'A' | 'B') {
    if (this.turboState[button]) return;

    this.turboState[button] = true;

    if (this.turboState.interval) {
      window.clearInterval(this.turboState.interval);
    }

    this.startInterval();
  }

  private stopTurbo(button: 'A' | 'B') {
    this.turboState[button] = false;

    if (this.turboState.interval) {
      window.clearInterval(this.turboState.interval);
      this.turboState.interval = null;
    }

    if (this.turboState.A || this.turboState.B) {
      this.startInterval();
    }
  }

  private startInterval() {
    this.turboState.interval = window.setInterval(() => {
      if (this.turboState.A) {
        this.handleDown(Controller.BUTTON_A);
        setTimeout(() => this.handleUp(Controller.BUTTON_A), 25);
      }
      if (this.turboState.B) {
        this.handleDown(Controller.BUTTON_B);
        setTimeout(() => this.handleUp(Controller.BUTTON_B), 25);
      }
    }, 50);
  }
}

export default Gamepad;
