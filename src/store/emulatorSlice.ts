import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface IEmulatorState {
  gameName: string;
  gameRom: string;
  isStarted: boolean;
  isFullScreen: boolean;
  isPaused: boolean;
}

const initialState: IEmulatorState = {
  gameName: '',
  gameRom: '',
  isStarted: false,
  isFullScreen: false,
  isPaused: false,
};

export const fetchRom = createAsyncThunk(
  'emulator/fetchRom',
  async (romPath: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<ArrayBuffer>(romPath, { responseType: 'arraybuffer' });
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
    startGame(state) {
      state.isStarted = true;
    },
    setFullScreen(state, action: PayloadAction<boolean>) {
      state.isFullScreen = action.payload;
    },
    togglePause(state) {
      state.isPaused = !state.isPaused;
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

export const { setGameName, startGame, setFullScreen, togglePause } = emulatorSlice.actions;

export default emulatorSlice.reducer;
