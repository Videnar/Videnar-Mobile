import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/screens/SplashScreen';
import { navigationRef, isReadyRef } from './src/navigation/RootNavigation';
import { Context } from './src/contexts';
import { Main, Auth as AuthComponent } from './src/navigation/Navigators';
import { Reducer, initialState } from './src/contexts/Reducer';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

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

  useEffect(() => {
    const addDeviceToken = async () => {
      const authStatusNoti = await messaging().requestPermission();
      const enabled =
        authStatusNoti === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatusNoti === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status: ' + authStatusNoti);
        const deviceToken = await AsyncStorage.getItem('@deviceToken');
        if (deviceToken !== null) {
          console.log('Token ---> ', deviceToken);
        } else {
          const token = await messaging().getToken();
          await AsyncStorage.setItem('@deviceToken', token);
        }
        messaging().onTokenRefresh(async (newToken) => {
          console.log('New Token --> ', newToken);
          await AsyncStorage.setItem('@deviceToken', newToken);
        });
      }
    };
    addDeviceToken();

    messaging().onMessage(async (remoteMessage) => {
      console.log('A new Message arrived --> ', remoteMessage);
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().getInitialNotification(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  }, []);

  const ContextValue = useMemo(
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
            }[state.screen]
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
