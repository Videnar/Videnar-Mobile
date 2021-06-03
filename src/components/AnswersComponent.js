import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import IndividualAnswerComponent from './IndividualAnswerComponent';
import firestore from '@react-native-firebase/firestore';

const AnswersComponent = ({ questionID }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    (async () => {
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
    })();
  }, [questionID]);

  const answerComponent = ({ item }) => {
    return <IndividualAnswerComponent answer={item} questionId={questionID} />;
  };
  return (
    <>
      <View>
        <Text style={styles.headerText}>Answers</Text>
      </View>
      <FlatList
        data={answers}
        renderItem={answerComponent}
        keyExtractor={(answer) => answer.id}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
      />
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
