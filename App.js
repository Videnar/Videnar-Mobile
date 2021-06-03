import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import UserPreferenceScreen from './src/screens/UserPreferenceScreen';
import { navigationRef, isReadyRef } from './src/navigation/RootNavigation';
import { Context } from './src/contexts';
import { Main, Auth as AuthComponent } from './src/navigation/Navigators';
import { Reducer, initialState } from './src/contexts/Reducer';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    (async () => {
      let user;
      let preferences;
      try {
        const stringifiedUser = await AsyncStorage.getItem('@user');
        const stringifiedPreferences = await AsyncStorage.getItem(
          '@preferences',
        );
        user = stringifiedUser != null ? JSON.parse(stringifiedUser) : null;
        preferences =
          stringifiedPreferences != null
            ? JSON.parse(stringifiedPreferences)
            : null;
      } catch (e) {
        // Restoring token failed
      }
      if (user !== null && preferences !== null) {
        dispatch({ type: 'setUser', payload: user });
        dispatch({ type: 'update_preferences', payload: preferences });
        dispatch({ type: 'changeScreen', payload: 'Main' });
      } else if (user !== null && preferences === null) {
        dispatch({ type: 'changeScreen', payload: 'UserPref' });
      } else {
        dispatch({ type: 'changeScreen', payload: 'Auth' });
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  const ContextValue = useMemo(
    () => ({
      setUser: async (user) => {
        dispatch({ type: 'setUser', payload: user });
        const str = JSON.stringify(user);
        AsyncStorage.setItem('@user', str);
      },
      removeUser: async (user) => {
        AsyncStorage.removeItem('@user');
        AsyncStorage.removeItem('@preferences');
      },
      updateUserPreferences: async (preferences) => {
        dispatch({ type: 'update_preferences', payload: preferences });
      },
      changeScreen: (screen) => {
        dispatch({ type: 'changeScreen', payload: screen });
      },
    }),
    [],
  );

  return (
    <Context.Provider
      value={{ state, ...ContextValue }}
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
              Auth: <Stack.Screen name="Auth" component={AuthComponent} />,
              UserPref: (
                <Stack.Screen
                  name="UserPref"
                  component={UserPreferenceScreen}
                />
              ),
            }[state.screen]
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
