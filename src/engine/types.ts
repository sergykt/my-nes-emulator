import { ButtonKey } from 'jsnes';

export interface GamepadButtons {
  A: string;
  B: string;
  TURBO_A: string;
  TURBO_B: string;
  START: string;
  SELECT: string;
  UP: string;
  DOWN: string;
  LEFT: string;
  RIGHT: string;
}

export interface GamepadMethods {
  handleDown: (code: ButtonKey) => void;
  handleUp: (code: ButtonKey) => void;
}

export interface ZapperMethods {
  handleMove: (x: number, y: number) => void;
  handleFireDown: () => void;
  handleFireUp: () => void;
}

export interface TurboState {
  A: boolean;
  B: boolean;
  interval: number | null;
}

export interface NesOptions {
  canvasEl: HTMLCanvasElement;
  buttons: GamepadButtons;
}
