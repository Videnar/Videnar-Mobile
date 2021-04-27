export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin': {
      // const { username, attributes } = action.payload;
      // const customPreferences = attributes['custom:preferences'];
      // const preferences = customPreferences
      //   ? JSON.parse(customPreferences)
      //   : null;
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { ...state };
    case 'update_preferences':
      return { ...state, preferences: action.payload };
    case 'changeScreen':
      return { ...state, screen: action.payload };
    default:
      return state;
  }
};

export const initialState = {
  screen: 'Main',
  username: null,
  attributes: null,
  preferences: null,
};
