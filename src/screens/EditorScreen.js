import React, { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
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

  const saveToCloud = async (str) => {
    if (str === defaultContent) {
      Alert.alert('Please Write something');
    } else {
      if (functionName === 'submitQuestion') {
        try {
          firestore()
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
        } catch (err) {
          console.log('error creating Question:', err);
        }
      } else if (functionName === 'updateQuestion') {
        try {
          firestore()
            .collection('questions')
            .doc(questionId)
            .update({
              content: str,
              updatedAt: firestore.Timestamp.now(),
            })
            .then(() => {
              console.log('document updated');
            });
        } catch (err) {
          console.log('error updating Question:', err);
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
        } catch (err) {
          console.log('error creating Answer:', err);
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
        } catch (err) {
          console.log('error updating Answer:', err);
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
            onPress={() => saveToCloud(editorContentRef.current)}
          />
        }
        containerStyle={styles.header}
      />
      <Editor contentRef={editorContentRef} />
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
