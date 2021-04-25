import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import QuestionHeaderComponent from './QuestionHeaderComponent';
import QuestionBodyComponent from './QuestionBodyComponent';
import QuestionBottomComponent from './QuestionBottomComponent';
import QuestionMoreOverlayComponent from './QuestionMoreOverLayComponent';

const WIDTH = Dimensions.get('window').width;

const QuestionComponent = ({ question, navigation: { navigate, goBack } }) => {
  const route = useRoute();
  const {
    state: { username },
  } = useContext(AuthContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const { content } = question;

  return (
    <>
      <Pressable
        onPress={() => {
          route.name !== 'QuestionDetails' &&
            navigate('QuestionDetails', { questionID: question.id });
        }}>
        <Card containerStyle={styles.Card}>
          {/* Header Section */}
          <QuestionHeaderComponent />
          <Card.Divider />
          {/* Question Asked */}
          <QuestionBodyComponent content={content} />
          <Card.Divider />
          {/* Interactivity Section */}
          <QuestionBottomComponent
            username={username}
            question={question}
            isPopupVisible={(event) => {
              setPopupVisible(event);
            }}
          />
        </Card>
      </Pressable>
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
    borderRadius: 10,
    elevation: 4,
  },
});

export default QuestionComponent;
