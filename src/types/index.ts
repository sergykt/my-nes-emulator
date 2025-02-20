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

export enum Buttons {
  Left = 37,
  Up = 38,
  Right = 39,
  Down = 40,
  A = 83,
  B = 65,
  TurboA = 88,
  TurboB = 90,
  Start = 13,
  Select = 16,
}

export enum AlertType {
  MUTE = 'mute',
  UNMUTE = 'unmute',
  START = 'start',
  PAUSE = 'pause',
}
