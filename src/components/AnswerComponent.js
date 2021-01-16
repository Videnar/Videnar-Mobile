import React, {useState, useEffect} from 'react';
import {Text, Button, TextInput, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {API, graphqlOperation} from 'aws-amplify';
import {Icon, Card, CardItem} from 'native-base';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {
  createCommentOnAnswer,
  updateAnswer,
  deleteAnswer,
} from '../graphql/mutations';
import {listCommentOnAnswers} from '../graphql/queries';

const AnswerComponent = ({answer}) => {
  const [showCommentBoxForAnswer, setShowCommentBoxForAnswer] = useState(false);
  const [commentsOnAnswerInput, setCommentsOnAnswerInput] = useState('');
  const [commentsOnAnswer, setCommentsOnAnswer] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const {content, id, upvotes} = answer;
  useEffect(() => {
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
        console.log('error fetching commentsOnAnswer', err);
      }
    };
    fetchCommentsOnAnswer();
  }, [commentsOnAnswer, id]);

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

  const updateUpvote = async (n) => {
    try {
      await API.graphql({
        query: updateAnswer,
        variables: {
          input: {
            id,
            upvotes: upvotes + n,
          },
        },
      });
    } catch (err) {
      console.log('error updating Answer:', err);
    }
  };

  const deleteSelectedAnswer = async () => {
    try {
      await API.graphql({
        query: deleteAnswer,
        variables: {
          input: {id},
        },
      });
    } catch (err) {
      console.log('error updating Answer:', err);
    }
    setPopupVisible(false);
  };

  return (
    <View>
      <Card>
        <CardItem>
          <WebView
            originWhitelist={['*']}
            source={{
              html: `<head>
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                 </head>
                 <body >
                <div>${content}</div>
                </body>`,
            }}
            style={{width: 'auto', height: 200}}
          />
        </CardItem>
        <CardItem style={{flex: 1, justifyContent: 'space-around'}}>
          <Text style={styles.footerText}>Upvotes: {upvotes}</Text>
          <Icon
            name="caret-up"
            type="FontAwesome"
            onPress={() => {
              updateUpvote(1);
            }}
          />
          <Icon
            name="caret-down"
            type="FontAwesome"
            onPress={() => {
              updateUpvote(-1);
            }}
          />
          <Icon
            name="ellipsis-h"
            type="FontAwesome"
            onPress={() => {
              setPopupVisible(true);
            }}
          />
        </CardItem>
        <Dialog
          visible={popupVisible}
          onTouchOutside={() => {
            setPopupVisible(false);
          }}>
          <DialogContent>
            {/* <View onPress={editAnswer} style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </View> */}
            <View onPress={deleteSelectedAnswer} style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </DialogContent>
        </Dialog>
      </Card>
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

const styles = StyleSheet.create({
  footerText: {
    color: '#85898f',
    textAlign: 'right',
  },
});

export default AnswerComponent;
