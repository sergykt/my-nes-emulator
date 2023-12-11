import { configureStore } from '@reduxjs/toolkit';
import emulatorReducer from './emulatorSlice';
import searchBarReducer from './searchBarSlice';

const store = configureStore({
  reducer: {
    emulator: emulatorReducer,
    searchBar: searchBarReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
