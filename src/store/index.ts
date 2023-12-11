import { configureStore } from '@reduxjs/toolkit';
import emulatorReducer from './emulatorSlice';

const store = configureStore({
  reducer: {
    emulator: emulatorReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
