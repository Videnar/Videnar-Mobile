import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const ClockLottie = () => {
  return (
    <AnimatedLottieView
      style={styles.loadingClock}
      source={require('../../assets/Icons/clock-loading.json')}
      autoPlay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  loadingClock: {
    height: '80%',
    width: '80%',
    alignSelf: 'center',
  },
});

export default ClockLottie;
