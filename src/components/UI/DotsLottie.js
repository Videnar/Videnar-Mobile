import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { Text } from 'react-native-elements';
import { GREY } from '../../assets/colors/colors';

const DotsLottie = ({ text }) => {
  return (
    <>
      <Text style={styles.loadingText}>{text}</Text>
      <AnimatedLottieView
        style={styles.loadingDots}
        source={require('../../assets/Icons/loading-dots.json')}
        autoPlay={true}
        loop={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: '3%',
    color: GREY,
  },
  loadingDots: {
    height: 50,
  },
});

export default DotsLottie;
