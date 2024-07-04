import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleSound } from '@/engine';
import { AlertType } from '@/types';

interface IEmulatorState {
  gameName: string;
  gameRom: string;
  isStarted: boolean;
  isFullScreen: boolean;
  isPaused: boolean;
  isMuted: boolean;
  alertType: AlertType | null;
}

const initialState: IEmulatorState = {
  gameName: '',
  gameRom: '',
  isStarted: false,
  isFullScreen: false,
  isPaused: false,
  isMuted: false,
  alertType: null,
};

export const fetchRom = createAsyncThunk(
  'emulator/fetchRom',
  async (romPath: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<ArrayBuffer>(romPath, {
        responseType: 'arraybuffer',
      });
      const arrayBuffer = response.data;
      const decoder = new TextDecoder('x-user-defined');
      const romData = decoder.decode(arrayBuffer);
      return romData;
    } catch (error) {
      return rejectWithValue('ROM loading error');
    }
  }
);

const emulatorSlice = createSlice({
  name: 'emulator',
  initialState,
  reducers: {
    setGameName(state, action: PayloadAction<string>) {
      state.gameName = action.payload;
    },
    setGameRom(state, action: PayloadAction<string>) {
      state.gameRom = action.payload;
    },
    startGame(state) {
      state.isStarted = true;
    },
    setFullScreen(state, action: PayloadAction<boolean>) {
      state.isFullScreen = action.payload;
    },
    togglePause(state) {
      state.alertType = state.isPaused ? AlertType.START : AlertType.PAUSE;
      state.isPaused = !state.isPaused;
    },
    toggleVolume(state) {
      state.alertType = state.isMuted ? AlertType.UNMUTE : AlertType.MUTE;
      state.isMuted = !state.isMuted;
      toggleSound();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRom.fulfilled, (state, action: PayloadAction<string>) => {
        state.gameRom = action.payload;
      })
      .addCase(fetchRom.rejected, (state, action) => {
        state.gameRom = '';
        console.error(action.payload);
      });
  },
});

export const { setGameName, setGameRom, startGame, setFullScreen, togglePause, toggleVolume } =
  emulatorSlice.actions;

export default emulatorSlice.reducer;
