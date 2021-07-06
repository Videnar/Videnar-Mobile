import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const LoadingCircle = () => {
  return (
    <AnimatedLottieView
      style={styles.loadingCircle}
      source={require('../../assets/Icons/loading-circle.json')}
      autoPlay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  loadingCircle: {
    height: '85%',
    width: '85%',
    alignSelf: 'center',
  },
});

export default LoadingCircle;
