import { configureStore } from '@reduxjs/toolkit';
import randomListReducer from '../randomListSlice';

const store = configureStore({
  reducer: {
    randomList: randomListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;