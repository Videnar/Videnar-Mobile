import {Auth, Hub} from 'aws-amplify';
import createDataContext from './createDataContext';
import {navigate} from '../navigations/navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signin':
      return {userAttributes: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {userAttributes: null};
    default:
      return state;
  }
};

const openApp = (dispatch) => {
  Hub.listen('auth', () => {
    navigate('Home');
    Auth.currentAuthenticatedUser()
      .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
      .catch((err) => console.log(err));
  });
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    await Auth.currentAuthenticatedUser();
    navigate('Home');
    Auth.currentAuthenticatedUser()
      .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
      .catch((err) => console.log(err));
  } catch (err) {
    navigate('Signin');
  }
};

const socialAuth = (dispatch) => async (provider) => {
  Auth.federatedSignIn({provider});
  openApp(dispatch);
};

const signIn = (dispatch) => async (email, password) => {
  try {
    await Auth.signIn({
      username: email,
      password,
      attributes: {email},
    });
    openApp(dispatch);
  } catch (error) {
    console.log('error signing in', error);
  }
};

const signUp = (dispatch) => async (email, password) => {
  try {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
      },
    });
    openApp(dispatch);
  } catch (error) {
    console.log('error signing up:', error);
  }
};

const signOut = (dispatch) => async () => {
  Auth.signOut()
    .then((user) => {
      navigate('Signin');
      dispatch({type: 'signout'});
    })
    .catch((err) => console.log(err));
};

const changePassword = (oldPassword, newPassword) => {
  try {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signIn, signOut, signUp, socialAuth, tryLocalSignin, changePassword},
  {userAttributes: null},
);
