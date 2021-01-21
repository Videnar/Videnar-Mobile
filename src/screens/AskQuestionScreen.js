import React, {useState, useContext, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion, updateQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';
import {AuthContext} from '../contexts/AuthContext';

const AskQuestionScreen = (props) => {
  const {
    state: {username},
  } = useContext(AuthContext);
  const [content, setContent] = useState('<p><br></p>');

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
    } catch (err) {
      console.log('error updating Question:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Editor setContent={setContent} content={content} />
      <Button title="Submit Question" onPress={submitQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AskQuestionScreen;
