import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';

const QuestionDetailBottomComponent = ({ question }) => {
  const { tags, upvotes } = question;

  return (
    <View style={styles.container}>
      <Text style={styles.tags}>#{tags}</Text>
      <UpVoteDownVoteComponent upVotes={upvotes} />
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
