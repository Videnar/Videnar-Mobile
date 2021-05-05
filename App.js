import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import { navigationRef, isReadyRef } from './src/navigation/RootNavigation';
import { AuthContext } from './src/contexts/AuthContext';
import { Main, Auth as AuthComponent } from './src/navigation/Navigators';
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
        dispatch({ type: 'setUser', payload: user });
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
      setUser: async (user) => {
        dispatch({ type: 'setUser', payload: user });
        const str = JSON.stringify(user);
        AsyncStorage.setItem('@user', str);
      },
      removeUser: async (user) => {
        dispatch({ type: 'removeUser' });
        AsyncStorage.removeItem('@user');
      },
      updateUserPreferences: async (preferences) => {},
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
              Auth: <Stack.Screen name="Auth" component={AuthComponent} />,
            }[state.screen]
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
