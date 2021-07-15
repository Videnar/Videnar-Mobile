import React from 'react';
import { Text } from 'react-native-elements';
import { shareQuestion } from '../utilities/functions';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import MoreIcon from '../utilities/Icons/MoreIcon';
import ShareIcon from '../utilities/Icons/ShareIcon';

const QuestionBottomComponent = ({
  upVotes,
  isPopupVisible,
  questionId,
  navigate,
}) => {
  const onAnswerClicked = () => {
    navigate('EditorScreen', {
      questionId: questionId,
      functionName: 'submitAnswer',
      headerText: 'Write an Answer',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.upvoteContainer}>
          <Icon
            type="material"
            name="forward"
            color={GREY}
            containerStyle={styles.upVoteIcon}
          />
          <Text style={styles.upvoteText}>{upVotes}</Text>
        </View>
        <TouchableOpacity
          onPress={onAnswerClicked}
          style={styles.answerContainer}>
          <Text style={styles.answerText}>Answer</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={shareQuestion}>
        <ShareIcon size={22} />
      </TouchableOpacity>
      {/** more options Edit/Delete */}
      <TouchableOpacity onPress={() => isPopupVisible(true)}>
        <MoreIcon size={19} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
  },
  leftContainer: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between',
  },
  upvoteContainer: {
    width: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  upVoteIcon: {
    transform: [{ rotate: '270deg' }],
  },
  upvoteText: {
    color: GREY,
    letterSpacing: 1,
    fontWeight: '700',
  },
  answerContainer: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerText: {
    color: DEEP_GREEN,
    letterSpacing: 1,
    fontWeight: '700',
  },
});

export default React.memo(QuestionBottomComponent);
