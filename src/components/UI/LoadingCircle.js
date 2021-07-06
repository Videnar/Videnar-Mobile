import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const LoadingCircle = ({ height, width }) => {
  return (
    <AnimatedLottieView
      style={styles.loadingCircle(height, width)}
      source={require('../../assets/Icons/loading-circle.json')}
      autoPlay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  loadingCircle: (height, width) => {
    return {
      height: height,
      width: width,
      alignSelf: 'center',
    };
  },
});

export default LoadingCircle;
