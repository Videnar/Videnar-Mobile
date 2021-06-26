import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPreferenceScreen from './src/screens/UserPreferenceScreen';
import {
  navigate,
  navigationRef,
  isReadyRef,
} from './src/navigation/RootNavigation';
import { Context } from './src/contexts';
import { Main, Auth as AuthComponent } from './src/navigation/Navigators';
import { Reducer, initialState } from './src/contexts/Reducer';
import messaging from '@react-native-firebase/messaging';
import InAppUpdate from './src/utilities/InAppUpdate';
import { Alert } from 'react-native';

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
        const token = await AsyncStorage.getItem('@deviceToken');
        dispatch({ type: 'setDeviceToken', payload: token });
        if (user !== null && preferences !== null) {
          dispatch({ type: 'setUser', payload: user });
          dispatch({ type: 'update_preferences', payload: preferences });
          dispatch({ type: 'changeScreen', payload: 'Main' });
        } else if (user !== null && preferences === null) {
          dispatch({
            type: 'changeScreen',
            payload: { screen: 'UserPref', previousScreen: 'Main' },
          });
          dispatch({ type: 'changeScreen', payload: 'UserPref' });
        } else {
          dispatch({ type: 'changeScreen', payload: { screen: 'Auth' } });
        }
      } catch (e) {
        // Restoring token failed
      }
    })();
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
        const deviceToken = await AsyncStorage.getItem('@deviceToken');
        if (!deviceToken) {
          const token = await messaging().getToken();
          await AsyncStorage.setItem('@deviceToken', token);
          dispatch({ type: 'setDeviceToken', payload: token });
        } else {
          dispatch({ type: 'setDeviceToken', payload: deviceToken });
        }
        messaging().onTokenRefresh(async (newToken) => {
          await AsyncStorage.setItem('@deviceToken', newToken);
          dispatch({ type: 'setDeviceTOken', payload: newToken });
        });
      }
    };
    addDeviceToken();

    messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      const questionId = remoteMessage.data.questionId;
      navigate('QuestionDetails', { questionID: questionId });
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const questionId = remoteMessage.data.questionId;
          navigate('QuestionDetails', { questionID: questionId });
        }
      });
  }, []);

  useEffect(() => {
    // In App Update
    console.log('Checking Update...');
    InAppUpdate.checkUpdate();
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
      changeScreen: (screen, previousScreen) => {
        dispatch({ type: 'changeScreen', payload: { screen, previousScreen } });
      },
    }),
    [],
  );

  return (
    <Context.Provider value={{ state, ...ContextValue }}>
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
