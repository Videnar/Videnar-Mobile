import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../contexts/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { restoreUser } = useContext(AuthContext);
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
        restoreUser(user);
        navigation.navigate('Main');
      } else {
        navigation.navigate('Auth');
      }
    };
    bootstrapAsync();
  }, []);

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
