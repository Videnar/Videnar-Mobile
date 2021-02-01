import React, { useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import {
  navigate,
  navigationRef,
  isReadyRef,
} from './src/navigation/RootNavigation';
import { AuthContext } from './src/contexts/AuthContext';
import {
  Main,
  Auth as AuthComponent,
  UserInfo,
} from './src/navigation/Navigators';
import { AuthReducer, initialState } from './src/contexts/AuthReducer';
import getDeepLink from './src/utilities/getDeepLink';

PushNotification.onRegister((token) => {
  console.log('onRegister', token);
});
PushNotification.onNotification((notification) => {
  if (notification.foreground) {
    console.log('onNotification foreground', notification);
  } else {
    console.log('onNotification background or closed', notification);
  }
  // extract the data passed in the push notification
  const data = JSON.parse(notification.data['pinpoint.jsonBody']);
  console.log('onNotification data', data);
  // iOS only
  // notification.finish(PushNotificationIOS.FetchResult.NoData);
});
PushNotification.onNotificationOpened((notification) => {
  console.log('onNotificationOpened', notification);
  // extract the data passed in the push notification
  const data = JSON.parse(notification['pinpoint.jsonBody']);
  console.log('onNotificationOpened data', data);
});

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  const AuthContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await Auth.signIn({
            username: email,
            password,
            attributes: { email },
          });
          Auth.currentAuthenticatedUser()
            .then(({ username, attributes }) => {
              dispatch({ type: 'signin', payload: { username, attributes } });
              const jsonValue = JSON.stringify({ username, attributes });
              AsyncStorage.setItem('@user', jsonValue);
              if (attributes['custom:preferences']) {
                navigate('Main');
              } else {
                navigate('UserInfo');
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('error signing in', error);
        }
      },
      restoreUser: (data) => {
        dispatch({ type: 'signin', payload: data });
      },
      signOut: async () => {
        Auth.signOut()
          .then(() => {
            AsyncStorage.removeItem('@user');
            navigate('Auth');
            // dispatch({type: 'signout'});
          })
          .catch((err) => console.log(err, 'err'));
      },

      signUp: async (email, password) => {
        try {
          await Auth.signUp({
            username: email,
            password,
            attributes: {
              email,
            },
          });
          Auth.currentAuthenticatedUser()
            .then(({ username, attributes }) => {
              dispatch({ type: 'signin', payload: { username, attributes } });
              const jsonValue = JSON.stringify({ username, attributes });
              AsyncStorage.setItem('@user', jsonValue);
              navigate('UserInfo');
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('error signing up:', error);
        }
      },
      updateUserPreferences: async (preferences) => {
        let user = await Auth.currentAuthenticatedUser();
        const { username, attributes } = user;
        const stringifiedPref = JSON.stringify(preferences);
        await Auth.updateUserAttributes(user, {
          'custom:preferences': stringifiedPref,
        })
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        dispatch({ type: 'update_preferences', payload: preferences });
        const newAttributes = Object.assign({}, attributes, {
          'custom:preferences': stringifiedPref,
        });
        const jsonValue = JSON.stringify({ username, ...newAttributes });
        AsyncStorage.setItem('@user', jsonValue);
      },
      socialAuth: async (provider) => {
        Auth.federatedSignIn({ provider });
        Auth.currentAuthenticatedUser()
          .then(({ username, attributes }) => {
            dispatch({ type: 'signin', payload: { username, attributes } });
            const jsonValue = JSON.stringify({ username, attributes });
            AsyncStorage.setItem('@user', jsonValue);
            if (attributes['custom:preferences']) {
              navigate('Main');
            } else {
              navigate('UserInfo');
            }
          })
          .catch((err) => console.log(err));
      },
      changePassword: (oldPassword, newPassword) => {
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
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ state, ...AuthContextValue }}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Auth" component={AuthComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
