// src/store/randomReducer.ts
export interface RandomState {
  numbers: number[];
}

const initialState: RandomState = {
  numbers: [],
};

export const randomReducer = (state = initialState, action: any): RandomState => {
  switch (action.type) {
    case 'ADD_RANDOM':
      return {
        ...state,
        numbers: [...state.numbers, action.payload],
      };
    default:
      return state;
  }
};