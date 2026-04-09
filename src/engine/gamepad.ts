import { Controller } from 'jsnes';
import { type GamepadMethods, type GamepadButtons } from './types';

class Gamepad {
  handleDown: GamepadMethods['handleDown'];

  handleUp: GamepadMethods['handleUp'];

  buttons: GamepadButtons;

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
      case this.buttons.TURBO_A:
        return Controller.BUTTON_TURBO_A;
      case this.buttons.TURBO_B:
        return Controller.BUTTON_TURBO_B;
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
    const nesButton = this.getButton(event.code);
    if (nesButton === undefined) return;
    this.handleDown(nesButton);
  }

  onKeyUp(event: KeyboardEvent) {
    const nesButton = this.getButton(event.code);
    if (nesButton === undefined) return;
    this.handleUp(nesButton);
  }
}

export default Gamepad;
