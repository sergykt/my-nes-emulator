declare module 'jsnes' {
  interface Options {
    onFrame?: (buffer: Uint32Array) => void;
    onAudioSample?: (left: number, right: number) => void;
    sampleRate?: number;
    preferredFrameRate?: number;
  }

  export class NES {
    constructor(options: Options);

    frame(): void;

    loadROM(rom: string): void;

    buttonDown(player: number, code: number): void;

    buttonUp(player: number, code: number): void;

    zapperMove(x: number, y: number): void;

    zapperFireDown(): void;

    zapperFireUp(): void;

    getFPS(): number;
  }

  export class Controller {
    static readonly BUTTON_A: number;

    static readonly BUTTON_B: number;

    static readonly BUTTON_SELECT: number;

    static readonly BUTTON_START: number;

    static readonly BUTTON_UP: number;

    static readonly BUTTON_DOWN: number;

    static readonly BUTTON_LEFT: number;

    static readonly BUTTON_RIGHT: number;

    state: number[];

    constructor();
  }
}
