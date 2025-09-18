import { createStore, combineReducers } from 'redux';
import { userReducer } from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);