import { createContext } from 'react';

const dbReducer = (action) => {
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
      return { ...state, ...state };
    case 'update_preferences':
      return { ...state, preferences: action.payload };
    case 'changeScreen':
      return { ...state, screen: action.payload };
    default:
      return state;
  }
};

const state = {
  screen: 'Main',
  userID: null,
  attributes: null,
  preferences: null,
};

export const AuthContext = createContext({ state, dbReducer });
