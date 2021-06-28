import React from 'react';
import { StyleSheet, View } from 'react-native';
import ClockLottie from './ClockLottie';
import DotsLottie from './DotsLottie';

const LoadingAnimation = () => {
  return (
    <View style={styles.loadingContainer}>
      <ClockLottie />
      <View style={styles.loadingTextContainer}>
        <DotsLottie text="Loading Questions 🌏" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    height: '115%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
  },
  loadingClock: {
    height: '80%',
    width: '80%',
    alignSelf: 'center',
  },
  loadingTextContainer: {
    height: '10%',
    flexDirection: 'row',
    marginLeft: '5%',
    bottom: 70,
  },
  loadingText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: '3%',
  },
  loadingDots: {
    height: 50,
  },
});

export default LoadingAnimation;
