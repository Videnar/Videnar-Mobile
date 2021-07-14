import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import QuestionHeaderComponent from './QuestionHeaderComponent';
import QuestionBodyComponent from './QuestionBodyComponent';
import QuestionBottomComponent from './QuestionBottomComponent';
import MoreOptionsQuestionBottomSheet from './MoreOptionsQuestionBottomSheet';
import { WHITE } from '../assets/colors/colors';

const QuestionComponent = ({
  questionId,
  questionerUId,
  upVotesCount,
  createdAt,
  content,
  userDisplayName,
  route,
  navigation: { navigate, goBack },
}) => {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <>
      <Card containerStyle={styles.Card}>
        <Pressable
          onPress={() => {
            route.name !== 'QuestionDetails' &&
              navigate('QuestionDetails', { questionID: questionId });
          }}>
          {/* Header Section */}
          <QuestionHeaderComponent
            userDisplayName={userDisplayName}
            createdAt={createdAt}
          />
          {/* Question Asked */}
          <QuestionBodyComponent content={content} />
          {/* Interactivity Section */}
        </Pressable>
        <Card.Divider />
        <QuestionBottomComponent
          questionerUId={questionerUId}
          questionId={questionId}
          upVotes={upVotesCount}
          isPopupVisible={(event) => {
            setPopupVisible(event);
          }}
        />
      </Card>
      {/* Edit Delete actions */}
      <MoreOptionsQuestionBottomSheet
        popupVisible={popupVisible}
        isPopupVisible={(event) => setPopupVisible(event)}
        questionId={questionId}
        content={content}
        navigate={navigate}
        goBack={goBack}
        route={route}
      />
    </>
  );
};

const styles = StyleSheet.create({
  Card: {
    width: '100%',
    elevation: 2,
    marginHorizontal: 0,
    marginVertical: 5,
    borderColor: WHITE,
  },
});

export default React.memo(QuestionComponent);
