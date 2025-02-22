import { NES, Controller } from 'jsnes';
import Screen from './screen';
import Speaker from './speaker';

export interface Gamepad {
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

interface TurboState {
  A: boolean;
  B: boolean;
  interval: number | null;
}

export interface NesOptions {
  canvasEl: HTMLCanvasElement;
  buttons: Gamepad;
}

export class NesGame {
  private readonly nes: NES;

  private readonly screen: Screen;

  private readonly speaker: Speaker;

  private readonly buttons: Gamepad;

  private readonly player = 1;

  private isPaused = false;

  private lastTime = 0;

  private turboState: TurboState = {
    A: false,
    B: false,
    interval: null,
  };

  constructor({ canvasEl, buttons }: NesOptions) {
    this.screen = new Screen(canvasEl);
    this.speaker = new Speaker();
    this.buttons = buttons;
    this.nes = new NES({
      onFrame: (buffer: Uint32Array) => this.screen.writeBuffer(buffer),
      onAudioSample: (l: number, r: number) => this.speaker.updateAudioData(l, r),
      sampleRate: this.speaker.getSampleRate(),
      preferredFrameRate: 60,
    });
  }

  loadRom(rom: string) {
    this.nes.loadROM(rom);
  }

  private onAnimationFrame(time = 0) {
    if (this.isPaused) {
      return;
    }
    if (time - this.lastTime >= 1000 / 64) {
      this.nes.frame();
      this.screen.setImageData();
      this.lastTime = time;
    }
    window.requestAnimationFrame((newTime) => this.onAnimationFrame(newTime));
  }

  async startGame() {
    this.onAnimationFrame();
    await this.speaker.start();
    document.addEventListener('keydown', (event) => this.onKeyDown(event));
    document.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  async togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.onAnimationFrame();
    } else {
      this.screen.setPauseBackground();
    }
    await this.speaker.toggle();
  }

  toggleVolume() {
    this.speaker.toggleVolume();
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
      this.nes.buttonDown(this.player, nesButton);
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
      this.nes.buttonUp(this.player, nesButton);
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
        this.nes.buttonDown(this.player, Controller.BUTTON_A);
        setTimeout(() => this.nes.buttonUp(this.player, Controller.BUTTON_A), 25);
      }
      if (this.turboState.B) {
        this.nes.buttonDown(this.player, Controller.BUTTON_B);
        setTimeout(() => this.nes.buttonUp(this.player, Controller.BUTTON_B), 25);
      }
    }, 50);
  }
}
