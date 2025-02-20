import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AlertType } from '@/types';

interface EmulatorState {
  gameName: string;
  gameRom: string;
  isStarted: boolean;
  isFullScreen: boolean;
  isPaused: boolean;
  isMuted: boolean;
  alertType: AlertType | null;
}

interface EmulatorActions {
  setGameName: (name: string) => void;
  setGameRom: (rom: string) => void;
  startGame: () => void;
  setFullScreen: (isFullScreen: boolean) => void;
  togglePause: () => void;
  toggleVolume: () => void;
  fetchRom: (romPath: string) => Promise<void>;
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
        alertType: state.isPaused ? AlertType.START : AlertType.PAUSE,
      })),
    toggleVolume: () =>
      set((state) => ({
        isMuted: !state.isMuted,
        alertType: state.isMuted ? AlertType.UNMUTE : AlertType.MUTE,
      })),
  }))
);

export default useEmulatorStore;
