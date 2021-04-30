import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const QuestionDetailBottomComponent = ({ question }) => {
  const { tags, upvotes } = question;

  const [upVoteColor, setUpVoteColor] = useState('grey');
  const [downVoteColor, setDownVoteColor] = useState('grey');

  //UpVote Action
  const onUpvotePressHandler = () => {
    setUpVoteColor('#F07D60');
    setDownVoteColor('grey');
  };

  //DownVote Action
  const onDownUpvotePressHandler = () => {
    setUpVoteColor('grey');
    setDownVoteColor('#F07D60');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tags}>#{tags}</Text>
      <Text style={styles.upvotes}>Upvotes: {upvotes}</Text>
      <View style={styles.vote}>
        {/**UpVote */}
        <Icon
          name="forward"
          type="material"
          size={25}
          color={upVoteColor}
          onPress={() => onUpvotePressHandler()}
          containerStyle={styles.upVote}
        />
        {/**DownVote */}
        <Icon
          name="forward"
          type="material"
          size={25}
          color={downVoteColor}
          onPress={() => onDownUpvotePressHandler()}
          containerStyle={styles.downVote}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-around',
  },
  vote: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  upVote: {
    transform: [{ rotate: '270deg' }],
  },
  downVote: {
    transform: [{ rotate: '90deg' }],
  },
});

export default QuestionDetailBottomComponent;
