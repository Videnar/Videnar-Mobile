export const Reducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'setUser': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'removeUser':
      return { ...state, ...initialState, screen: 'Auth' };
    case 'update_preferences':
      return { ...state, preferences: action.payload };
    case 'changeScreen':
      return { ...state, ...action.payload };
    case 'setDeviceToken':
      return { ...state, setDeviceToken: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  screen: 'Splash',
  previousScreen: null,
  userID: null,
  preferences: null,
  setDeviceToken: null,
};
