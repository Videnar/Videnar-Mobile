import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';

const AnswerBottomComponent = ({ answer, questionId }) => {
  const updateUpvoteHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .collection('answers')
      .doc(answer.id)
      .update({
        ...answer,
        upvotes: count,
      });
  };
  return (
    <View style={styles.bottomContainer}>
      {/** Answer Approval */}
      <View style={styles.feedBackContainer}>
        <Icon type="material" name="history" size={16} />
        <Text style={styles.feedBackText}>Pending</Text>
      </View>
      <UpVoteDownVoteComponent
        upVotes={answer.upvotes}
        updateUpvote={(count) => updateUpvoteHandler(count)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  feedBackContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  feedBackText: {
    paddingLeft: 3,
  },
});

export default AnswerBottomComponent;
