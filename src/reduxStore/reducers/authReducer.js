import {SIGNIN, SIGNOUT} from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGNIN:
      return {...state, isSignedIn: true, userId: action.payload};
    case SIGNOUT:
      return {...state, isSignedIn: false, userId: null};
    default:
      return state;
  }
};
