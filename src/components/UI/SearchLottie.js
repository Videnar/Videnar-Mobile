import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const SearchLottie = () => {
  return (
    <AnimatedLottieView
      style={styles.lottieContainer}
      source={require('../../assets/Icons/searching-for-results.json')}
      autoPlay={true}
      loop={true}
    />
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    height: '85%',
    width: '85%',
    alignSelf: 'center',
  },
});

export default SearchLottie;
