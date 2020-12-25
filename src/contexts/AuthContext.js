import {Auth, Hub} from 'aws-amplify';
import createDataContext from './createDataContext';
import * as RootNavigation from '../RootNavigation';

const authReducer = (state, action) => {
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
    // case 'signout':
    //   return {attributes: null, preferences: null};
    case 'update_preferences':
      return {...state, preferences: action.payload};
    default:
      return state;
  }
};

const openApp = (dispatch) => {
  Hub.listen('auth', () => {
    RootNavigation.navigate('Home');
    Auth.currentAuthenticatedUser()
      .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
      .catch((err) => console.log(err));
  });
};

const updateUserPreferences = (dispatch) => async (preferences) => {
  let user = await Auth.currentAuthenticatedUser();
  let result = await Auth.updateUserAttributes(user, {
    'custom:preferences': JSON.stringify(preferences),
  })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  dispatch({type: 'update_preferences', payload: preferences});
  console.log(result, 'result');
};

const socialAuth = (dispatch) => async (provider) => {
  Auth.federatedSignIn({provider});
  Hub.listen('auth', () => {
    Auth.currentAuthenticatedUser()
      .then(({attributes}) => {
        // eslint-disable-next-line quotes
        if (attributes[`custom:preferences`]) {
          RootNavigation.navigate('Main');
        } else {
          RootNavigation.navigate('SelectEducation');
        }
        dispatch({type: 'signin', payload: attributes});
      })
      .catch((err) => console.log(err));
  });
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    await Auth.currentAuthenticatedUser()
      .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
      .catch((err) => console.log(err))
      .navigate('Main');
  } catch (err) {
    RootNavigation.navigate('Signin');
  }
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
    Auth.currentAuthenticatedUser()
      .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
      .catch((err) => console.log(err));
    RootNavigation.navigate('SelectEducation');
  } catch (error) {
    console.log('error signing up:', error);
  }
};

const signOut = (dispatch) => async () => {
  Auth.signOut()
    .then(() => {
      RootNavigation.navigate('Signin');
    })
    .catch((err) => console.log(err, 'err'));
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
  {
    signIn,
    signOut,
    signUp,
    tryLocalSignin,
    socialAuth,
    changePassword,
    updateUserPreferences,
  },
  {attributes: null, preferences: null},
);
