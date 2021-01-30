import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion, updateQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';
import {AuthContext} from '../contexts/AuthContext';
import {
  Button,
  Text,
  Header,
  Container,
  Right,
  Left,
  Body,
  Title,
  Content,
} from 'native-base';

const AskQuestionScreen = (props) => {
  const {
    state: {username},
  } = useContext(AuthContext);
  const [content, setContent] = useState('<p><br></p>');

  console.log('rerendering');

  useEffect(() => {
    if (props.route.params) {
      setContent(props.route.params.content);
    }
  }, [props.route.params]);

  const submitQuestion = async () => {
    if (props.route.params) {
      updateSelectedQuestion();
    }
    try {
      await API.graphql(
        graphqlOperation(createQuestion, {
          input: {
            username,
            content: content,
            upvotes: 0,
            view: 0,
            tags: 'neet',
            noOfBookmarks: 0,
          },
        }),
      );
      props.navigation.navigate('Home');
    } catch (err) {
      console.log('error creating Question:', content);
    }
  };

  const updateSelectedQuestion = async (n) => {
    const {id} = props.route.params;
    try {
      await API.graphql({
        query: updateQuestion,
        variables: {
          input: {
            id,
            content,
          },
        },
      });
      props.navigation.navigate('Home');
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
        <Body style={{flex: 3}}>
          <Title>Ask Your Question</Title>
        </Body>
        <Right>
          <Button style={styles.button} onPress={submitQuestion}>
            <Text style={styles.buttonText}>Post</Text>
          </Button>
        </Right>
      </Header>
      <Editor style={styles.editor} setContent={setContent} content={content} />
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
