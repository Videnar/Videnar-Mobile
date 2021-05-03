import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IndividualAnswerComponent from './IndividualAnswerComponent';

const AnswersComponent = () => {
  const allAnswers = [];

  return (
    <>
      <View>
        <Text style={styles.headerText}>Answers</Text>
      </View>
      <IndividualAnswerComponent />
      <IndividualAnswerComponent />
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default AnswersComponent;
