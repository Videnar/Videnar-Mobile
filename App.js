import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserPreferenceScreen from './src/screens/UserPreferenceScreen';
import SplashScreen from './src/screens/SplashScreen';
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
    console.log('Checking for an Update...');
    InAppUpdate.checkUpdate();
  }, []);

  const ContextValue = useMemo(
    () => ({
      setDeviceToken: async (token) => {
        dispatch({ type: 'setDeviceToken', payload: token });
      },
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
              Splash: <Stack.Screen name="Splash" component={SplashScreen} />,
            }[state.screen]
          }
        </Stack.Navigator>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
