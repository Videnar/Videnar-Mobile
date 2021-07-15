import React, { useContext } from 'react';
import { Text } from 'react-native-elements';
import { shareQuestion } from '../utilities/functions';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Share from 'react-native-share';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';
import AnswerIcon from '../utilities/Icons/AnswerIcon';
import MoreIcon from '../utilities/Icons/MoreIcon';
import ShareIcon from '../utilities/Icons/ShareIcon';

const QuestionBottomComponent = ({
  questionerUId,
  questionId,
  upVotes,
  isPopupVisible,
}) => {
  const {
    state: { userID },
  } = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.noInteractionContainer}>
        <View style={styles.upvoteContainer}>
          <Icon
            type="material"
            name="forward"
            color={GREY}
            containerStyle={styles.upVoteIcon}
          />
          <Text style={styles.upvoteText}>{upVotes}</Text>
        </View>
        <View style={styles.answerContainer}>
          <AnswerIcon size={20} />
          <Text style={styles.answerText}>0</Text>
        </View>
      </View>
      <TouchableOpacity onPress={shareQuestionHandler}>
        <ShareIcon size={22} />
      </TouchableOpacity>
      {/** more options Edit/Delete */}
      {questionerUId === userID ? (
        <TouchableOpacity onPress={() => isPopupVisible(true)}>
          <MoreIcon size={19} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
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
  noInteractionContainer: {
    flexDirection: 'row',
    width: '35%',
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
    width: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answerText: {
    color: GREY,
    letterSpacing: 1,
    fontWeight: '700',
  },
});

export default React.memo(QuestionBottomComponent);
