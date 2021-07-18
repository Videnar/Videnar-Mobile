import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Spacer from './Spacer';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

function RemovedQuestion({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Sorry, this question has been removed by user!! 😞
      </Text>
      <Spacer />
      <Button
        type="clear"
        title="Go Back"
        titleStyle={styles.buttonText}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    bottom: '5%',
  },
  text: {
    fontSize: 18,
    color: GREY,
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonText: {
    color: DEEP_GREEN,
    fontSize: 20,
    letterSpacing: 0.5,
  },
});

export default RemovedQuestion;
