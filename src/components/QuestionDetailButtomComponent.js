import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';

const QuestionDetailBottomComponent = ({ question, questionId }) => {
  const updateUpvoteHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .update({
        ...question,
        upvotes: count,
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tags}>#{question.tags}</Text>
      <UpVoteDownVoteComponent
        upVotes={question.upvotes}
        updateUpvote={(count) => updateUpvoteHandler(count)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-around',
  },
});

export default QuestionDetailBottomComponent;
