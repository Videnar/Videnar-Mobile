import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';

const AnswerBottomComponent = ({ answer, questionId }) => {
  return (
    <View style={styles.bottomContainer}>
      {/** Answer Approval */}
      <View style={styles.feedBackContainer}>
        <Icon type="material" name="history" size={16} />
        <Text style={styles.feedBackText}>Pending</Text>
      </View>
      <UpVoteDownVoteComponent upVotes={answer.upvotes} />
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
