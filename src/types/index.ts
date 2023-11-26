export interface IGame {
  id: number;
  name: string;
  shortName: string;
  img: string;
  description: string;
}

export interface IFullScreenElement extends HTMLDivElement {
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
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
  Select = 16
}