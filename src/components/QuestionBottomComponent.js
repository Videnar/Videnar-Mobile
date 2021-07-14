import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';
import { shareQuestion } from '../utilities/functions';

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
    <View style={styles.Options}>
      <View style={styles.upvoteContainer}>
        <Text style={styles.upvoteText}>Upvotes: {upVotes}</Text>
      </View>
      <Icon
        name="share"
        type="material"
        color={GREY}
        size={20}
        onPress={() => shareQuestion(questionId)}
      />
      {/** more options Edit/Delete */}
      {questionerUId === userID && (
        <Icon
          name="more-vert"
          type="material"
          color={GREY}
          size={22}
          onPress={() => isPopupVisible(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Options: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
  },
  upvoteContainer: {
    width: '40%',
    alignItems: 'center',
  },
  upvoteText: {
    color: GREY,
    letterSpacing: 1,
    fontWeight: '700',
  },
});

export default React.memo(QuestionBottomComponent);
