import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Editor from '../components/Editor';
import { Button, Text, Header, Icon } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';

const AskQuestionScreen = ({ route, navigation }) => {
  const {
    state: { uid },
  } = useContext(AuthContext);
  const [webref, setWebref] = useState();

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const submitQuestion = async (str) => {
    const oldContent = route.params === undefined ? null : route.params.content;
    if (oldContent) {
      updateSelectedQuestion(str);
    }
    try {
      firestore
        .collection('questions')
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
      navigation.goBack();
    } catch (err) {
      console.log('error creating Question:', err);
    }
  };

  const updateSelectedQuestion = async (str) => {
    const questionID = route.params === undefined ? null : route.params.id;
    try {
      // navigation.goBack();
    } catch (err) {
      console.log('error updating Question:', err);
    }
  };

  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon
            name="arrow-back"
            type="material"
            onPress={() => navigation.goBack()}
          />
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
          submit={submitQuestion}
          oldContent={route.params === undefined ? null : route.params.content}
          webref={webref}
          setWebref={setWebref}
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

export default AskQuestionScreen;
