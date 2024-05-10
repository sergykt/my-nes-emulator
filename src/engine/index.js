import jsnes from 'jsnes';

const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;
const FRAMEBUFFER_SIZE = SCREEN_WIDTH * SCREEN_HEIGHT;

let canvas_ctx;
let image;
let framebuffer_u8;
let framebuffer_u32;

const AUDIO_BUFFERING = 512;
const SAMPLE_COUNT = 4 * 1024;
const SAMPLE_MASK = SAMPLE_COUNT - 1;
const audio_samples_L = new Float32Array(SAMPLE_COUNT);
const audio_samples_R = new Float32Array(SAMPLE_COUNT);
let audio_write_cursor = 0;
let audio_read_cursor = 0;
let buffer;
let audio_ctx;
let script_processor;
let gainNode;
let isPaused = true;
let volume = 1;

const nes = new jsnes.NES({
  onFrame(framebuffer_24) {
    for (let i = 0; i < FRAMEBUFFER_SIZE; i++) framebuffer_u32[i] = 0xff000000 | framebuffer_24[i];
  },
  onAudioSample(l, r) {
    audio_samples_L[audio_write_cursor] = l;
    audio_samples_R[audio_write_cursor] = r;
    audio_write_cursor = (audio_write_cursor + 1) & SAMPLE_MASK;
  },
});

function onAnimationFrame() {
  window.requestAnimationFrame(onAnimationFrame);
  image.data.set(framebuffer_u8);
  canvas_ctx.putImageData(image, 0, 0);
  if (isPaused) {
    canvas_ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }
}

function audio_remain() {
  return (audio_write_cursor - audio_read_cursor) & SAMPLE_MASK;
}

export function toggleSound() {
  volume = volume ? 0 : 1;
}

function audio_callback(event) {
  if (document.hidden) return;

  const dst = event.outputBuffer;
  const len = dst.length;

  // Attempt to avoid buffer underruns.
  if (audio_remain() < AUDIO_BUFFERING) nes.frame();

  const dst_l = dst.getChannelData(0);
  const dst_r = dst.getChannelData(1);
  for (let i = 0; i < len; i++) {
    const src_idx = (audio_read_cursor + i) & SAMPLE_MASK;
    dst_l[i] = audio_samples_L[src_idx] * volume;
    dst_r[i] = audio_samples_R[src_idx] * volume;
  }

  audio_read_cursor = (audio_read_cursor + len) & SAMPLE_MASK;
}

let turboIntervalA = null;
let isTurboActiveA = false;
let turboIntervalB = null;
let isTurboActiveB = false;

function keyboard(callback, event) {
  const player = 1;
  switch (event.keyCode) {
    case 38: // UP
      callback(player, jsnes.Controller.BUTTON_UP);
      break;
    case 40: // Down
      callback(player, jsnes.Controller.BUTTON_DOWN);
      break;
    case 37: // Left
      callback(player, jsnes.Controller.BUTTON_LEFT);
      break;
    case 39: // Right
      callback(player, jsnes.Controller.BUTTON_RIGHT);
      break;
    case 65: // 'a'
      callback(player, jsnes.Controller.BUTTON_B);
      break;
    case 83: // 's'
      callback(player, jsnes.Controller.BUTTON_A);
      break;
    case 16: // Right Shift
      callback(player, jsnes.Controller.BUTTON_SELECT);
      break;
    case 13: // Enter
      callback(player, jsnes.Controller.BUTTON_START);
      break;
    case 88: // 'z' turbo Button A
      if (event.type === 'keydown' && !isTurboActiveA && isTurboActiveB) {
        isTurboActiveA = !isTurboActiveA;
        clearInterval(turboIntervalB);
        turboIntervalA = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_A);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_A), 25);
        }, 50);
        turboIntervalB = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_B);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_B), 25);
        }, 50);
      }
      if (event.type === 'keydown' && !isTurboActiveA) {
        isTurboActiveA = !isTurboActiveA;
        turboIntervalA = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_A);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_A), 25);
        }, 50);
      }
      if (event.type === 'keyup') {
        clearInterval(turboIntervalA);
        isTurboActiveA = !isTurboActiveA;
      }
      break;
    case 90: // 'x' turbo Button B
      if (event.type === 'keydown' && !isTurboActiveB && isTurboActiveA) {
        isTurboActiveB = !isTurboActiveB;
        clearInterval(turboIntervalA);
        turboIntervalA = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_A);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_A), 25);
        }, 50);
        turboIntervalB = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_B);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_B), 25);
        }, 50);
      }
      if (event.type === 'keydown' && !isTurboActiveB) {
        isTurboActiveB = !isTurboActiveB;
        turboIntervalB = setInterval(() => {
          nes.buttonDown(player, jsnes.Controller.BUTTON_B);
          setTimeout(() => nes.buttonUp(player, jsnes.Controller.BUTTON_B), 25);
        }, 50);
      }
      if (event.type === 'keyup') {
        clearInterval(turboIntervalB);
        isTurboActiveB = !isTurboActiveB;
      }
      break;
    default:
      break;
  }
}

export function nesToggleStart() {
  if (!isPaused) {
    script_processor.disconnect(audio_ctx.destination);
    script_processor.onaudioprocess = null;
    script_processor = null;
  } else {
    script_processor = audio_ctx.createScriptProcessor(AUDIO_BUFFERING, 0, 2);
    script_processor.onaudioprocess = audio_callback;
    script_processor.connect(audio_ctx.destination);
  }
  isPaused = !isPaused;
}

function nes_init(canvas_id) {
  const canvas = document.getElementById(canvas_id);
  canvas_ctx = canvas.getContext('2d');
  image = canvas_ctx.getImageData(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  canvas_ctx.fillStyle = 'black';
  canvas_ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Allocate framebuffer array.
  buffer = new ArrayBuffer(image.data.length);
  framebuffer_u8 = new Uint8ClampedArray(buffer);
  framebuffer_u32 = new Uint32Array(buffer);

  // Setup audio.
  audio_ctx = new window.AudioContext();
  nesToggleStart();
}

function nes_boot(rom_data) {
  nes.loadROM(rom_data);
  window.requestAnimationFrame(onAnimationFrame);
}

export function nesLoadData(canvas_id, rom_data) {
  nes_init(canvas_id);
  nes_boot(rom_data);
  const canvasScreen = document.getElementById(canvas_id);
  document.addEventListener('keydown', (event) => {
    keyboard(nes.buttonDown, event);
  });
  document.addEventListener('keyup', (event) => {
    keyboard(nes.buttonUp, event);
  });
  canvasScreen.addEventListener('pointerdown', (e) => {
    const { clientX, clientY, target } = e;
    const rect = target.getBoundingClientRect();
    const scale = target.clientWidth / SCREEN_WIDTH;
    const x = Math.round((clientX - rect.left) / scale);
    const y = Math.round((clientY - rect.top) / scale);
    nes.zapperMove(x, y);
    nes.zapperFireDown();
  });
  canvasScreen.addEventListener('pointerup', () => {
    nes.zapperFireUp();
  });
}
