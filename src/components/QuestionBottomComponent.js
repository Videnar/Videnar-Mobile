import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Share from 'react-native-share';
import { LIGHT_GREEN, YELLOW } from '../assets/colors/colors';

const WIDTH = Dimensions.get('window').width;

const QuestionBottomComponent = ({ userID, question, isPopupVisible }) => {
  const { id, tags, upvotes } = question;

  const shareQuestionHandler = () => {
    const options = {
      message: `Can you answer this question on Videnar https://videnar.com/${id}`,
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
        <Text style={styles.upvoteText}>Upvotes: {upvotes}</Text>
      </View>
      <Icon
        name="share"
        type="material"
        color={LIGHT_GREEN}
        size={20}
        onPress={shareQuestionHandler}
      />
      {/** more options Edit/Delete */}
      {question.userID === userID && (
        <Icon
          name="more-vert"
          type="material"
          color={YELLOW}
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
    color: YELLOW,
  },
});

export default QuestionBottomComponent;
