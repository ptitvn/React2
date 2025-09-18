import { createStore, combineReducers } from 'redux';
import { randomReducer } from './randomReducer';

const rootReducer = combineReducers({
  random: randomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);