import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  Button,
  TextInput,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { Icon, Card, CardItem } from 'native-base';
import firestore from '@react-native-firebase/firestore';
import CommentComponent from './CommentComponent';
import { AuthContext } from '../contexts/AuthContext';
import { navigate } from '../navigation/RootNavigation.js';
import ActionDialog from './ActionDialog';

const AnswerComponent = ({ answer, setAnswer, setAnswerId }) => {
  const route = useRoute();
  const {
    state: { userDisplayName },
  } = useContext(AuthContext);
  const [showCommentBoxForAnswer, setShowCommentBoxForAnswer] = useState(false);
  const [commentsOnAnswerInput, setCommentsOnAnswerInput] = useState('');
  const [commentsOnAnswer, setCommentsOnAnswer] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const { content, questionID, id, upvotes } = answer;
  useEffect(() => {
    const fetchCommentsOnAnswer = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionID)
          .collection('answers')
          .doc(id)
          .collection('comments')
          .onSnapshot((querySnapshot) => {
            const comnts = [];
            querySnapshot.forEach((documentSnapshot) => {
              comnts.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setCommentsOnAnswer(comnts);
          });
      } catch (err) {
        console.log('error fetching commentsOnAnswer', err);
      }
    };
    fetchCommentsOnAnswer();
  }, [commentsOnAnswer, id, questionID]);

  const submitCommentOnAnswer = async () => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .doc(id)
        .collection('comments')
        .add({
          userDisplayName,
          content: commentsOnAnswerInput,
          answerID: id,
          questionID,
        });
      setCommentsOnAnswerInput('');
      setShowCommentBoxForAnswer(!showCommentBoxForAnswer);
    } catch (err) {
      console.log('error creating comment:', this.state.content);
    }
  };

  const updateUpvote = async (n) => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .doc(id)
        .update({
          upvotes: upvotes + n,
        });
    } catch (err) {
      console.log('error updating Answer:', err);
    }
  };

  const editAnswer = () => {
    setAnswer(content);
    setAnswerId(id);
    setPopupVisible(false);
  };

  const deleteSelectedAnswer = async () => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .doc(id)
        .delete();
    } catch (err) {
      console.log('error deleting Answer:', err);
    }
    setPopupVisible(false);
  };

  const updateSelectedComment = async (Id, commentContent) => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .doc(id)
        .collection('comments')
        .doc(Id)
        .update({
          content: commentContent,
        });
    } catch (err) {
      console.log('error updating Comment:', err);
    }
  };

  const deleteSelectedComment = async (Id) => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionID)
        .collection('answers')
        .doc(id)
        .collection('comments')
        .doc(Id)
        .delete();
    } catch (err) {
      console.log('error updating Comment:', err);
    }
  };

  return (
    <Pressable
      onPress={() => {
        route.name !== 'QuestionDetails' &&
          navigate('QuestionDetails', { questionID });
      }}>
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
            style={styles.WebView}
          />
        </CardItem>
        <CardItem style={styles.cardItem}>
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
          {answer.userDisplayName === userDisplayName && (
            <Icon
              name="ellipsis-h"
              type="FontAwesome"
              onPress={() => {
                setPopupVisible(true);
              }}
            />
          )}
        </CardItem>
        <ActionDialog
          popupVisible={popupVisible}
          setPopupVisible={setPopupVisible}
          editItem={editAnswer}
          deleteItem={deleteSelectedAnswer}
        />
      </Card>
      {commentsOnAnswer.map((comment, index) => (
        <View key={comment.id ? comment.id : index}>
          <CommentComponent
            id={comment.id}
            comment={comment}
            updateComment={updateSelectedComment}
            deleteComment={deleteSelectedComment}
          />
        </View>
      ))}
      {showCommentBoxForAnswer ? (
        <>
          <TextInput
            style={styles.text}
            onChangeText={(text) => setCommentsOnAnswerInput(text)}
            value={commentsOnAnswerInput}
          />
          <Button title="Submit Comment" onPress={submitCommentOnAnswer} />
        </>
      ) : (
        <Text
          onPress={() => setShowCommentBoxForAnswer(!showCommentBoxForAnswer)}>
          Comment on this answer
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: '#85898f',
    textAlign: 'right',
  },
  text: { height: 40, borderColor: 'gray', borderWidth: 1 },
  cardItem: { flex: 1, justifyContent: 'space-around' },
  WebView: { width: 'auto', height: 400 },
});

export default AnswerComponent;
