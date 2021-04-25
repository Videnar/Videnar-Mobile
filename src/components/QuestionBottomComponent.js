import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Share from 'react-native-share';

const QuestionBottomComponent = ({ username, question, isPopupVisible }) => {
  const { tags, upvotes } = question;

  const shareQuestionHandler = () => {
    const options = {
      message: 'Can you answer this Question',
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
      <Text style={styles.tags}>#{tags}</Text>
      <Text style={styles.upvotes}>Upvotes: {upvotes}</Text>
      <Icon
        name="share"
        type="material"
        color="grey"
        onPress={shareQuestionHandler}
      />
      {question.username === username && (
        <Icon
          name="more-vert"
          type="material"
          color="grey"
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
    height: 18,
  },
  upvotes: {
    color: 'orange',
    textAlign: 'right',
  },
  tags: {
    color: '#FF303A',
  },
});

export default QuestionBottomComponent;
