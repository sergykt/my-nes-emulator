import { NES } from 'jsnes';
import Gamepad from './gamepad';
import Screen from './screen';
import Speaker from './speaker';
import Zapper from './zapper';
import { type NesOptions } from './types';

class NesGame {
  private readonly nes: NES;

  private readonly gamepad: Gamepad;

  private readonly screen: Screen;

  private readonly canvasEl: HTMLCanvasElement;

  private readonly speaker: Speaker;

  private readonly zapper: Zapper;

  private readonly player = 1;

  private readonly FPS = 60;

  private readonly frameTime = 1000 / this.FPS;

  private isPaused = false;

  private lastTime = 0;

  constructor({ canvasEl, buttons }: NesOptions) {
    this.canvasEl = canvasEl;
    this.screen = new Screen(canvasEl);
    this.speaker = new Speaker();
    this.nes = new NES({
      onFrame: (buffer: Uint32Array) => this.screen.writeBuffer(buffer),
      onAudioSample: (l: number, r: number) => this.speaker.updateAudioData(l, r),
      sampleRate: this.speaker.getSampleRate(),
      preferredFrameRate: this.FPS,
    });
    this.gamepad = new Gamepad(
      {
        handleDown: (button: number) => this.nes.buttonDown(this.player, button),
        handleUp: (button: number) => this.nes.buttonUp(this.player, button),
      },
      buttons
    );
    this.zapper = new Zapper({
      handleMove: (x: number, y: number) => this.nes.zapperMove(x, y),
      handleFireDown: () => this.nes.zapperFireDown(),
      handleFireUp: () => this.nes.zapperFireUp(),
    });
  }

  loadRom(rom: string) {
    this.nes.loadROM(rom);
  }

  private onAnimationFrame(time = 0) {
    if (this.isPaused) {
      return;
    }
    const delta = time - this.lastTime;

    if (delta >= this.frameTime) {
      this.nes.frame();
      this.screen.setImageData();
      const numFrames = Math.floor(delta / this.frameTime);
      if (numFrames > 1) {
        queueMicrotask(() => {
          this.nes.frame();
        });
      }
      this.lastTime = time - (delta % this.frameTime);
    }

    window.requestAnimationFrame((t) => this.onAnimationFrame(t));
  }

  async startGame() {
    await this.speaker.start();
    this.onAnimationFrame();
  }

  subscribeEvents() {
    const onKeyDown = (event: KeyboardEvent) => this.gamepad.onKeyDown(event);
    const onKeyUp = (event: KeyboardEvent) => this.gamepad.onKeyUp(event);
    const onCanvasTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const onZapperDown = (event: PointerEvent) => {
      event.preventDefault();
      this.zapper.fireDown(event);
    };
    const onZapperUp = (event: PointerEvent) => {
      event.preventDefault();
      this.zapper.fireUp();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    this.canvasEl.addEventListener('touchstart', onCanvasTouchStart, { passive: false });
    this.canvasEl.addEventListener('pointerdown', onZapperDown);
    this.canvasEl.addEventListener('pointerup', onZapperUp);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
      this.canvasEl.removeEventListener('touchstart', onCanvasTouchStart);
      this.canvasEl.removeEventListener('pointerdown', onZapperDown);
      this.canvasEl.removeEventListener('pointerup', onZapperUp);
    };
  }

  async togglePause() {
    await this.speaker.toggle();
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.onAnimationFrame();
    } else {
      this.screen.setPauseBackground();
    }
  }

  toggleVolume() {
    this.speaker.toggleVolume();
  }
}

export default NesGame;
