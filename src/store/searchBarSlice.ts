import { createSlice } from '@reduxjs/toolkit';

interface ISearchBarState {
  isActive: boolean;
}

const initialState: ISearchBarState = {
  isActive: false,
};

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    toggleSearchBar(state) {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleSearchBar } = searchBarSlice.actions;

export default searchBarSlice.reducer;
