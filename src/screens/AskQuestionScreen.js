import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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

const AskQuestionScreen = (props) => {
  const [webref, setWebref] = useState();

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
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
        style={styles.editor}
        oldContent={
          props.route.params === undefined ? null : props.route.params.content
        }
        questionID={
          props.route.params === undefined ? null : props.route.params.id
        }
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
  editor: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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

function areEqual(prevProps, nextProps) {
  return prevProps.route.params.id === nextProps.route.params.id;
}
export default React.memo(AskQuestionScreen, areEqual);
