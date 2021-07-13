import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import Share from 'react-native-share';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';
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

  const shareQuestionHandler = () => {
    const options = {
      message: `Can you answer this question on Videnar https://videnar.com/question?id=${questionId}`,
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <View style={styles.Options}>
      <View style={styles.upvoteContainer}>
        <Text style={styles.upvoteText}>Upvotes: {upVotes}</Text>
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
