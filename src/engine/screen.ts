/* eslint-disable no-bitwise */
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;
const FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

class Screen {
  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private readonly image: ImageData;

  private readonly buffer: ArrayBuffer;

  private readonly framebuffer_u8: Uint8ClampedArray;

  private readonly framebuffer_u32: Uint32Array;

  constructor(canvasEl: HTMLCanvasElement) {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.image = this.ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.buffer = new ArrayBuffer(this.image.data.length);
    this.framebuffer_u8 = new Uint8ClampedArray(this.buffer);
    this.framebuffer_u32 = new Uint32Array(this.buffer);
  }

  writeBuffer(buffer: Uint32Array) {
    for (let i = 0; i < FRAMEBUFFER_SIZE; i += 1) {
      this.framebuffer_u32[i] = 0xff000000 | buffer[i];
    }
  }

  setImageData() {
    this.image.data.set(this.framebuffer_u8);
    this.ctx.putImageData(this.image, 0, 0);
  }

  setPauseBackground() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }
}

export default Screen;
