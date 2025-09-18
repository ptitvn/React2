import { createStore, combineReducers } from 'redux';
import { companyReducer } from './companyReducer';

const rootReducer = combineReducers({
  company: companyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);