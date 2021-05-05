import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IndividualAnswerComponent from './IndividualAnswerComponent';
import firestore from '@react-native-firebase/firestore';

const AnswersComponent = ({ questionID }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionID)
          .collection('answers')
          .onSnapshot((querySnapshot) => {
            const ans = [];
            querySnapshot.forEach((documentSnapshot) => {
              ans.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setAnswers(ans);
          });
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };
    fetchAnswers();
  }, [questionID]);

  const createAnswerComponent = answers.map((answer) => (
    <IndividualAnswerComponent key={answer.id} answer={answer} />
  ));

  return (
    <>
      <View>
        <Text style={styles.headerText}>Answers</Text>
      </View>
      {createAnswerComponent}
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
