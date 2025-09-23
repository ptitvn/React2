import { createSlice } from '@reduxjs/toolkit';

type DisplayState = {
  mode: 'list' | 'grid';
};

const initialState: DisplayState = {
  mode: 'list',
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    toggleDisplayMode: (state) => {
      state.mode = state.mode === 'list' ? 'grid' : 'list';
    },
  },
});

export const { toggleDisplayMode } = displaySlice.actions;
export default displaySlice.reducer;