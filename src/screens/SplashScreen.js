import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
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
        crashlytics().log('Error in SplashScreen');
        crashlytics().recordError(e);
      }
    })();
  }, [changeScreen, setDeviceToken, setUser, updateUserPreferences]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Icons/logo_lottie.json')}
        autoPlay
        loop
        style={styles.LottieView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LottieView: {
    height: '50%',
    alignSelf: 'center',
  },
});

export default SplashScreen;
