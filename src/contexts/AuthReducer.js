export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin': {
      const customPreferences = action.payload['custom:preferences'];
      const preferences = customPreferences
        ? JSON.parse(customPreferences)
        : null;
      return {
        attributes: action.payload,
        preferences: preferences,
      };
    }
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {...state, attributes: null, preferences: null};
    case 'update_preferences':
      return {...state, preferences: action.payload};
    default:
      return state;
  }
};

export const initialState = {attributes: null, preferences: null};
