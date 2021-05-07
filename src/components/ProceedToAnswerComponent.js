import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, FAB, Header, Icon, Overlay } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Editor from './Editor';
import { Context } from '../contexts';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProceedToAnswerComponent = ({ questionID }) => {
  const {
    state: {
      userDisplayName,
      userID,
      answerIdToEdit,
      answerContentToEdit,
      showAnswerEditor,
    },
    toggleAnswerEditor,
    clearAnswerEditorData,
  } = useContext(Context);
  const [webref, setWebref] = useState(null);

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const submitAnswer = async (str) => {
    if (answerIdToEdit) {
      updateAnswer(str);
    } else {
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
    }
    clearAnswerEditorData();
  };

  const updateAnswer = async (str) => {
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
  };

  return (
    <>
      <FAB
        title="Answer"
        iconRight
        icon={<Icon type="material" name="add" color="white" />}
        placement="right"
        onPress={toggleAnswerEditor}
        color="#3DDC84"
      />
      {/** Editor is Passed Here */}
      <Overlay
        isVisible={showAnswerEditor}
        onBackdropPress={toggleAnswerEditor}
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
              onPress={toggleAnswerEditor}
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
          oldContent={answerContentToEdit}
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
