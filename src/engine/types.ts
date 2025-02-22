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
  handleDown: (code: number) => void;
  handleUp: (code: number) => void;
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
