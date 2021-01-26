export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin': {
      const {username, attributes} = action.payload;
      const customPreferences = attributes['custom:preferences'];
      const preferences = customPreferences
        ? JSON.parse(customPreferences)
        : null;
      return {
        isSignedIn: true,
        attributes: attributes,
        preferences: preferences,
        username,
      };
    }
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {...state, isSignedIn: false};
    case 'update_preferences':
      return {...state, preferences: action.payload};
    default:
      return state;
  }
};

export const initialState = {
  username: null,
  isSignedIn: false,
  attributes: null,
  preferences: null,
};
