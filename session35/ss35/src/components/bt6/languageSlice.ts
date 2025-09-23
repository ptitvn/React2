import { createSlice } from '@reduxjs/toolkit';

type LanguageState = {
  current: 'en' | 'vi';
};

const initialState: LanguageState = {
  current: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.current = action.payload;
    },
    toggleLanguage: (state) => {
      state.current = state.current === 'en' ? 'vi' : 'en';
    },
  },
});

export const { setLanguage, toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;