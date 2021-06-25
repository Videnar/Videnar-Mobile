import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Share from 'react-native-share';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';

const WIDTH = Dimensions.get('window').width;

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
      message: `Can you answer this question on Videnar https://videnar.com/${questionId}`,
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
      <Icon
        name="share"
        type="material"
        color={GREY}
        size={20}
        onPress={shareQuestionHandler}
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
    width: WIDTH * 0.35,
    alignItems: 'center',
  },
  upvoteText: {
    color: GREY,
    letterSpacing: 1,
    fontWeight: '700',
  },
});

export default React.memo(QuestionBottomComponent);
