import React, {useState, useEffect} from 'react';
import {Text, Button, TextInput, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {API, graphqlOperation} from 'aws-amplify';
import {createCommentOnAnswer} from '../graphql/mutations';
import {listCommentOnAnswers} from '../graphql/queries';

const AnswerComponent = ({answer}) => {
  const [showCommentBoxForAnswer, setShowCommentBoxForAnswer] = useState(false);
  const [commentsOnAnswerInput, setCommentsOnAnswerInput] = useState('');
  const [commentsOnAnswer, setCommentsOnAnswer] = useState([]);
  const {content, id, upvotes} = answer;
  useEffect(() => {
    fetchCommentsOnAnswer();
  }, []);
  const fetchCommentsOnAnswer = async () => {
    try {
      const list = await API.graphql({
        query: listCommentOnAnswers,
        variables: {
          filter: {
            answerID: {eq: id},
          },
        },
      });
      const comments = list.data.listCommentOnAnswers.items;
      setCommentsOnAnswer([...commentsOnAnswer, ...comments]);
    } catch (err) {
      console.log('error fetching commentsOnQuestion', err);
    }
  };

  const submitCommentOnAnswer = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCommentOnAnswer, {
          input: {
            content: commentsOnAnswerInput,
            answerID: id,
          },
        }),
      );
      setCommentsOnAnswerInput('');
      setShowCommentBoxForAnswer(!showCommentBoxForAnswer);
    } catch (err) {
      console.log('error creating comment:', this.state.content);
    }
  };
  return (
    <View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: content,
        }}
        style={{width: 'auto', display: 'inline-block'}}
      />
      <View>
        <Text>Upvotes: {upvotes}</Text>
      </View>
      {commentsOnAnswer.map((comment, index) => (
        <View key={comment.id ? comment.id : index}>
          <Text>{comment.content}</Text>
        </View>
      ))}
      {showCommentBoxForAnswer ? (
        <>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
            }}
            onChangeText={(text) => setCommentsOnAnswerInput(text)}
            value={commentsOnAnswerInput}
          />
          <Button
            title="Submit Comment"
            onPress={() => submitCommentOnAnswer()}
          />
        </>
      ) : (
        <Text
          onPress={() => setShowCommentBoxForAnswer(!showCommentBoxForAnswer)}>
          Comment on this answer
        </Text>
      )}
    </View>
  );
};

export default AnswerComponent;
