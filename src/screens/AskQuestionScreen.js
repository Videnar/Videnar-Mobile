import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Editor from '../components/Editor';
import {
  Button,
  Text,
  Header,
  Container,
  Right,
  Left,
  Body,
  Title,
} from 'native-base';
import { AuthContext } from '../contexts/AuthContext';

const AskQuestionScreen = ({ route, navigation }) => {
  const {
    state: { name, uid },
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
      firestore().collection('Questions').add({
        uid,
        name,
        content: str,
        upvotes: 0,
        view: 0,
        tags: 'neet',
        noOfAnswers: 0,
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
    <Container style={styles.container}>
      <Header
        androidStatusBarColor="#fff8f5"
        iosBarStyle="dark-content"
        style={styles.header}
        noLeft>
        <Left />
        <Body style={{ flex: 3 }}>
          <Title>Ask Your Question</Title>
        </Body>
        <Right>
          <Button style={styles.button} onPress={submit}>
            <Text style={styles.buttonText}>Post</Text>
          </Button>
        </Right>
      </Header>
      <Editor
        submit={submitQuestion}
        oldContent={route.params === undefined ? null : route.params.content}
        webref={webref}
        setWebref={setWebref}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8f5',
  },
  header: {
    backgroundColor: '#f76f00',
  },
  button: {
    backgroundColor: '#fff8f5',
    borderRadius: 8,
    height: 36,
  },
  buttonText: {
    color: 'black',
  },
});

export default AskQuestionScreen;
