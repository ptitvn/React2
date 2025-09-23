import { createSlice } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
  isFavorite: boolean;
};

type UserState = {
  list: User[];
};

const initialState: UserState = {
  list: [
    { id: 1, name: 'Nguyễn Văn A', isFavorite: true },
    { id: 2, name: 'Nguyễn Văn B', isFavorite: false },
    { id: 3, name: 'Nguyễn Văn C', isFavorite: false },
    { id: 4, name: 'Nguyễn Văn D', isFavorite: true },
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) {
        user.isFavorite = !user.isFavorite;
      }
    },
  },
});

export const { toggleFavorite } = userSlice.actions;
export default userSlice.reducer;