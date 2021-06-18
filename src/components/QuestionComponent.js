import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import { Context } from '../contexts';
import QuestionHeaderComponent from './QuestionHeaderComponent';
import QuestionBodyComponent from './QuestionBodyComponent';
import QuestionBottomComponent from './QuestionBottomComponent';
import QuestionMoreOverlayComponent from './QuestionMoreOverLayComponent';
import { WHITE } from '../assets/colors/colors';

const QuestionComponent = ({ question, navigation: { navigate, goBack } }) => {
  const route = useRoute();
  const {
    state: { userID },
  } = useContext(Context);
  const [popupVisible, setPopupVisible] = useState(false);
  const { content, userDisplayName } = question;

  return (
    <>
      <Card containerStyle={styles.Card}>
        <Pressable
          onPress={() => {
            route.name !== 'QuestionDetails' &&
              navigate('QuestionDetails', { questionID: question.id });
          }}>
          {/* Header Section */}
          <QuestionHeaderComponent userDisplayName={userDisplayName} />
          {/* Question Asked */}
          <QuestionBodyComponent content={content} />
          {/* Interactivity Section */}
        </Pressable>
        <Card.Divider />
        <QuestionBottomComponent
          userID={userID}
          question={question}
          isPopupVisible={(event) => {
            setPopupVisible(event);
          }}
        />
      </Card>
      {/* Edit Delete actions */}
      <QuestionMoreOverlayComponent
        popupVisible={popupVisible}
        isPopupVisible={(event) => setPopupVisible(event)}
        question={question}
        navigate={navigate}
        goBack={goBack}
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

export default QuestionComponent;
