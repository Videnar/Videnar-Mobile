import React, { useContext, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import { Context } from '../contexts';
import Editor from '../components/Editor';
import { Button, Header, Icon } from 'react-native-elements';
import crashlytics from '@react-native-firebase/crashlytics';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import EditorTagsOverlay from '../components/EditorTagsOverlay';

const EditorScreen = ({
  navigation: { goBack },
  route: {
    params: { content, questionId, answerId, functionName, headerText },
  },
}) => {
  const {
    state: { userDisplayName, userID, preferences, setDeviceToken },
  } = useContext(Context);
  const defaultContent = content ? content : '<p><br></p>';
  const editorContentRef = useRef(defaultContent);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [isProceedPressed, setIsProceedPressed] = useState(false);

  const saveToCloud = async (tags) => {
    const editorContent = editorContentRef.current;
    if (editorContent === defaultContent) {
      Toast.show({
        type: 'info',
        position: 'top',
        text1: 'Old and New contents are same! 🤐',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 80,
        bottomOffset: 40,
      });
    } else {
      if (functionName === 'submitQuestion') {
        try {
          await firestore()
            .collection('questions')
            .add({
              userID,
              userDisplayName,
              content: editorContent,
              upvotes: 0,
              view: 0,
              noOfAnswers: 0,
              deviceToken: setDeviceToken,
              createdAt: firestore.Timestamp.now(),
              tags: tags,
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
          crashlytics().log(
            'error creating Question, saveToCloud,  EditorScreen',
          );
          crashlytics().recordError(err);
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
              content: editorContent,
              tags: tags,
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
          crashlytics().log(
            'error updating Question, saveToCloud,  EditorScreen',
          );
          crashlytics().recordError(err);
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
              content: editorContent,
              userDisplayName,
              userID,
              questionID: questionId,
              upvotes: 0,
              deviceToken: setDeviceToken,
              createdAt: firestore.Timestamp.now(),
            });
          Toast.show({
            type: 'success',
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
          crashlytics().log(
            'error creating answer, saveToCloud,  EditorScreen',
          );
          crashlytics().recordError(err);
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
              content: editorContent,
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
          crashlytics().log(
            'error updating Answer, saveToCloud,  EditorScreen',
          );
          crashlytics().recordError(err);
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
          functionName === 'submitQuestion' ||
          functionName === 'updateQuestion' ? (
            // Proceed Button
            <Button
              type="clear"
              title="Proceed"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              disabled={buttonDisable}
              onPress={() => setIsProceedPressed(true)}
            />
          ) : (
            // Submit Button
            <Button
              type="clear"
              title="Submit"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              disabled={buttonDisable}
              onPress={saveToCloud}
            />
          )
        }
        containerStyle={styles.header}
      />
      <Editor
        contentRef={editorContentRef}
        setButtonDisable={setButtonDisable}
        buttonDisable={buttonDisable}
      />
      <EditorTagsOverlay
        isVisible={isProceedPressed}
        setIsVisible={setIsProceedPressed}
        onSubmit={saveToCloud}
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
