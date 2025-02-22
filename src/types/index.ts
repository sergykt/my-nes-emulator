import { Gamepad } from '@/engine';

export interface Game {
  id: number;
  name: string;
  shortName: string;
  img: string;
  description: string;
}

export interface Rom {
  name: string;
  hash: string;
  id: string;
}

export interface RomDecoded {
  name: string;
  romData: string;
}

export const BUTTONS: Gamepad = {
  A: 'KeyS',
  B: 'KeyA',
  TURBO_A: 'KeyX',
  TURBO_B: 'KeyZ',
  START: 'Enter',
  SELECT: 'ShiftRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
};

export type Buttons = (typeof BUTTONS)[keyof typeof BUTTONS];

export const ALERT_TYPE = {
  MUTE: 'mute',
  UNMUTE: 'unmute',
  START: 'start',
  PAUSE: 'pause',
} as const;

export type AlertType = (typeof ALERT_TYPE)[keyof typeof ALERT_TYPE];
