import { createSlice } from '@reduxjs/toolkit';

type RandomListState = {
  numbers: number[];
};

const initialState: RandomListState = {
  numbers: [],
};

const randomListSlice = createSlice({
  name: 'randomList',
  initialState,
  reducers: {
    generateRandomList: (state) => {
      const newList = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 11)
      );
      state.numbers = newList;
    },
  },
});

export const { generateRandomList } = randomListSlice.actions;
export default randomListSlice.reducer;