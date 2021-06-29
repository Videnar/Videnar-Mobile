import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../contexts';

const SplashScreen = ({ navigation }) => {
  const { setUser, setDeviceToken, updateUserPreferences, changeScreen } =
    useContext(Context);

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
        setDeviceToken(token);
        if (user !== null && preferences !== null) {
          setUser(user);
          updateUserPreferences(preferences);
          changeScreen('Main', 'Splash');
        } else if (user !== null && preferences === null) {
          changeScreen('UserPref', 'Main');
        } else {
          changeScreen('Auth', 'Splash');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [changeScreen, setDeviceToken, setUser, updateUserPreferences]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('../assets/startIcon.json')}
        autoPlay
        loop
        style={{
          height: 300,
        }}
      />
    </View>
  );
};

export default SplashScreen;
