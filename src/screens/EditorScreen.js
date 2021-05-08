import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import Editor from '../components/Editor';
import { Button, Header, Icon } from 'react-native-elements';

const EditorScreen = ({
  navigation: { goBack },
  route: {
    params: { content, questionId, answerId, functionName },
  },
}) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [webref, setWebref] = useState(null);

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const saveToCloud = async (str) => {
    if (functionName === 'submitQuestion') {
      try {
        firestore().collection('questions').add({
          userID,
          userDisplayName,
          content: str,
          upvotes: 0,
          view: 0,
          tags: 'neet',
          noOfAnswers: 0,
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
          });
      } catch (err) {
        console.log('error updating Answer:', err);
      }
    }
  };

  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon name="arrow-back" type="material" onPress={goBack} />
        }
        centerComponent={{ text: 'Ask a Question', style: styles.headerText }}
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
        containerStyle={styles.header}
      />
      <View style={styles.container}>
        <Editor
          submit={saveToCloud}
          oldContent={content}
          webref={webref}
          setWebref={setWebref}
          goBack={goBack}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 0.5,
  },
  button: {
    width: 75,
    height: 35,
  },
  buttonText: {
    color: '#3DDC84',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default EditorScreen;
