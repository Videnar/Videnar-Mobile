import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, FAB, Header, Icon, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Editor from './Editor';
import { AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/RootNavigation.js';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProceedToAnswerComponent = ({
  answer,
  questionID,
  isAnswerEditorVisible,
  setIsAnswerEditorVisible,
}) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(AuthContext);
  const [webref, setWebref] = useState(null);
  const [answerIdToEdit, setAnswerIdToEdit] = useState(null);
  const [contentToEdit, setContentToEdit] = useState(null);

  useEffect(() => {
    if (answer) {
      const { content, id } = answer;
      setAnswerIdToEdit(content);
      setContentToEdit(id);
    }
  }, [answer]);

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const submitAnswer = async (str) => {
    if (answerIdToEdit) {
      try {
        await firestore()
          .collection('questions')
          .doc(questionID)
          .collection('answers')
          .doc(answerIdToEdit)
          .update({
            content: str,
          });
      } catch (err) {
        console.log('error updating Answer:', err);
      }
      return;
    }
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .add({
          content: str,
          userDisplayName,
          userID,
          questionID,
          upvotes: 0,
        });
    } catch (err) {
      console.log('error creating Answer:', err);
    }
    setIsAnswerEditorVisible(false);
  };

  return (
    <>
      <FAB
        title="Answer"
        iconRight
        icon={<Icon type="material" name="add" color="white" />}
        placement="right"
        onPress={() => setIsAnswerEditorVisible(true)}
        color="#3DDC84"
      />
      {/** Editor is Passed Here */}
      <Overlay
        isVisible={isAnswerEditorVisible}
        onBackdropPress={() => setIsAnswerEditorVisible(false)}
        overlayStyle={styles.overlay}>
        <Header
          statusBarProps={{
            backgroundColor: 'white',
            barStyle: 'dark-content',
          }}
          leftComponent={
            <Icon
              name="arrow-back"
              type="material"
              onPress={() => setIsAnswerEditorVisible(false)}
            />
          }
          centerComponent={{
            text: 'Write Your Answer',
            style: styles.headerText,
          }}
          rightComponent={
            // Submit Button
            <Button
              type="outline"
              title="Submit"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              onPress={submit}
            />
          }
          backgroundColor="white"
        />
        <Editor
          oldContent={contentToEdit}
          submit={submitAnswer}
          webref={webref}
          setWebref={setWebref}
        />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: WIDTH,
    height: HEIGHT,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 0.5,
  },
});

export default ProceedToAnswerComponent;
