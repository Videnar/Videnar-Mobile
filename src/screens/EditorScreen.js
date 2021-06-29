import React, { useContext, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { Context } from '../contexts';
import Editor from '../components/Editor';
import { Button, Header, Icon } from 'react-native-elements';
import { Alert } from 'react-native';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const EditorScreen = ({
  navigation: { goBack },
  route: {
    params: { content, questionId, answerId, functionName, headerText },
  },
}) => {
  const {
    state: { userDisplayName, userID, preferences, setDeviceToken },
  } = useContext(Context);
  const defaultContent = '<p><br></p>';
  const editorContentRef = useRef(content ? content : defaultContent);
  const [buttonDisable, setButtonDisable] = useState(true);

  const saveToCloud = async (str) => {
    if (str === defaultContent) {
      Alert.alert('Please Write something');
    } else {
      if (functionName === 'submitQuestion') {
        try {
          await firestore()
            .collection('questions')
            .add({
              userID,
              userDisplayName,
              content: str,
              upvotes: 0,
              view: 0,
              noOfAnswers: 0,
              deviceToken: setDeviceToken,
              createdAt: firestore.Timestamp.now(),
              ...preferences,
            });
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Question created.',
            text2: 'Hurrah 😃',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        } catch (err) {
          console.log('error creating Question:', err);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Opps! Something went wrong.',
            text2: 'Please, try again 🙁',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
      } else if (functionName === 'updateQuestion') {
        try {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .update({
              content: str,
              updatedAt: firestore.Timestamp.now(),
            })
            .then(() => {
              console.log('document updated');
            });
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Question updated.',
            text2: 'Hurrah 😃',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        } catch (err) {
          console.log('error updating Question:', err);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Opps! Something went wrong.',
            text2: 'Please, try again 🙁',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
      } else if (functionName === 'submitAnswer') {
        try {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('answers')
            .add({
              content: str,
              userDisplayName,
              userID,
              questionID: questionId,
              upvotes: 0,
              createdAt: firestore.Timestamp.now(),
            });
          Toast.show({
            type: 's',
            position: 'bottom',
            text1: 'Answer submitted.',
            text2: 'Hurrah 😎',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        } catch (err) {
          console.log('error creating Answer:', err);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Opps! Something went wrong.',
            text2: 'Please, try again 🤕',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
      } else if (functionName === 'updateAnswer') {
        try {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('answers')
            .doc(answerId)
            .update({
              content: str,
              updatedAt: firestore.Timestamp.now(),
            });
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Answer updated.',
            text2: 'Hurrah 😎',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        } catch (err) {
          console.log('error updating Answer:', err);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Opps! Something went wrong.',
            text2: 'Please, try again 🤕',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
      }
      goBack();
    }
  };

  return (
    <>
      <Header
        statusBarProps={{
          backgroundColor: 'white',
          barStyle: 'dark-content',
        }}
        leftComponent={
          <Icon
            name="arrow-back"
            type="material"
            onPress={goBack}
            color={GREY}
            size={30}
          />
        }
        centerComponent={{ text: headerText, style: styles.headerText }}
        rightComponent={
          // Submit Button
          <Button
            type="clear"
            title="Submit"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            disabled={buttonDisable}
            onPress={() => saveToCloud(editorContentRef.current)}
          />
        }
        containerStyle={styles.header}
      />
      <Editor
        contentRef={editorContentRef}
        setButtonDisable={setButtonDisable}
        buttonDisable={buttonDisable}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    letterSpacing: 0.5,
    right: 30,
  },
  button: {
    width: 85,
    height: 35,
    borderRadius: 7,
  },
  buttonText: {
    color: GREY,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default EditorScreen;
