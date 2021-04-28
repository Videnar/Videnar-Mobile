import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import SplashScreen from './src/screens/SplashScreen';
import { navigationRef, isReadyRef } from './src/navigation/RootNavigation';
import { AuthContext } from './src/contexts/AuthContext';
import {
  Main,
  Auth as AuthComponent,
  UserInfo,
} from './src/navigation/Navigators';
import { AuthReducer, initialState } from './src/contexts/AuthReducer';

const Stack = createStackNavigator();

const linking = {
  prefixes: [
    /* your linking prefixes */
    'https://videnar.com',
    'videnar://',
  ],
  config: {
    /* configuration for matching screens with paths */
  },
};

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        const stringifiedValue = await AsyncStorage.getItem('@user');
        user = stringifiedValue != null ? JSON.parse(stringifiedValue) : null;
      } catch (e) {
        // Restoring token failed
      }
      if (user !== null) {
        dispatch({ type: 'changeScreen', payload: 'Main' });
      } else {
        dispatch({ type: 'changeScreen', payload: 'Auth' });
      }
    };
    bootstrapAsync();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  const AuthContextValue = useMemo(
    () => ({
      signIn: async (user) => {
        dispatch({ type: 'signin', payload: user });
        const jsonValue = JSON.stringify(user);
        AsyncStorage.setItem('@user', jsonValue);
      },
      signOut: async () => {
        try {
          await auth()
            .signOut()
            .then(() => {
              dispatch({ type: 'changeScreen', payload: 'Auth' });
              AsyncStorage.removeItem('@user');
            })
            .catch((err) => console.log(err, 'err'));
        } catch (err) {
          console.log(err);
        }
      },

      signUp: async (email, password, name) => {
        try {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
              }

              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
              }

              console.error(error);
            });
        } catch (error) {
          console.log('error signing up:', error);
        }
      },
      updateUserPreferences: async (preferences) => {},
      changePassword: (oldPassword, newPassword) => {
        try {
        } catch (err) {
          console.log(err);
        }
      },
      changeScreen: (screen) => {
        dispatch({ type: 'changeScreen', payload: screen });
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider
      value={{ state, ...AuthContextValue }}
      linking={linking}
      fallback={SplashScreen}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          {
            {
              Main: <Stack.Screen name="Main" component={Main} />,
              UserInfo: <Stack.Screen name="UserInfo" component={UserInfo} />,
              Auth: <Stack.Screen name="Auth" component={AuthComponent} />,
            }[state.screen]
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
