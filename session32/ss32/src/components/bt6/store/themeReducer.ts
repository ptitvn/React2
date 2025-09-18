export interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false, 
};

export const themeReducer = (state = initialState, action: any): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { isDarkMode: !state.isDarkMode };
    default:
      return state;
  }
};