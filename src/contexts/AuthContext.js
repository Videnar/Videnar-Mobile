import {Auth} from 'aws-amplify';
import createDataContext from './createDataContext';
import {navigate} from '../navigations/navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    await Auth.currentAuthenticatedUser();
    navigate('Home');
  } catch (err) {
    navigate('Signin');
  }
};

const socialAuth = (dispatch) => async (provider) => {
  Auth.federatedSignIn();
  // await Auth.currentAuthenticatedUser().catch((err) => console.log(err));
  // dispatch({ type: 'signin', payload: response.data.token });
  navigate('Home');
};

const signIn = (dispatch) => async (email, password) => {
  try {
    const {user} = await Auth.signIn({
      username: email,
      password,
      attributes: {email},
    });
    // dispatch({ type: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (error) {
    console.log('error signing in', error);
  }
};

const signUp = (dispatch) => async (email, password) => {
  try {
    const {user} = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    });
    // dispatch({ type: 'signin', payload: response.data.token });
    navigate('Home');
  } catch (error) {
    console.log('error signing up:', error);
  }
};

const signOut = (dispatch) => async () => {
  await Auth.signOut();
  // dispatch({ type: 'signin', payload: response.data.token });
  navigate('Signin');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut, signUp, socialAuth, tryLocalSignin},
  {userID: '', userName: ''},
);
