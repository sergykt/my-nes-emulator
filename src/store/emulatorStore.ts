import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ALERT_TYPE, type AlertType } from '@/types';
import { NesGame, NesOptions } from '@/engine';

interface EmulatorState {
  gameName: string;
  gameRom: string;
  isStarted: boolean;
  isFullScreen: boolean;
  isPaused: boolean;
  isMuted: boolean;
  alertType: AlertType | null;
  NES: NesGame | null;
}

interface EmulatorActions {
  setGameName: (name: string) => void;
  setGameRom: (rom: string) => void;
  startGame: () => void;
  setFullScreen: (isFullScreen: boolean) => void;
  togglePause: () => void;
  toggleVolume: () => void;
  fetchRom: (romPath: string) => Promise<void>;
  initNES: (options: NesOptions) => void;
}

const useEmulatorStore = create<EmulatorState & EmulatorActions>()(
  immer((set) => ({
    gameName: '',
    gameRom: '',
    isStarted: false,
    isFullScreen: false,
    isPaused: false,
    isMuted: false,
    alertType: null,
    NES: null,
    initNES: (options: NesOptions) => set({ NES: new NesGame(options) }),
    setGameName: (name: string) => set({ gameName: name }),
    setGameRom: (rom: string) => set({ gameRom: rom }),
    fetchRom: async (romPath: string) => {
      const response = await fetch(romPath);
      if (!response.ok) {
        throw new Error('ROM loading error');
      }
      const arrayBuffer = await response.arrayBuffer();
      const decoder = new TextDecoder('x-user-defined');
      const romData = decoder.decode(arrayBuffer);
      set({ gameRom: romData });
    },
    startGame: () => set({ isStarted: true }),
    setFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),
    togglePause: () =>
      set((state) => ({
        isPaused: !state.isPaused,
        alertType: state.isPaused ? ALERT_TYPE.START : ALERT_TYPE.PAUSE,
      })),
    toggleVolume: () =>
      set((state) => ({
        isMuted: !state.isMuted,
        alertType: state.isMuted ? ALERT_TYPE.UNMUTE : ALERT_TYPE.MUTE,
      })),
  }))
);

export default useEmulatorStore;
