import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import Editor from '../components/Editor';
import CommentComponent from '../components/CommentComponent';
import { AuthContext } from '../contexts/AuthContext';

const QuestionDetailsScreen = (props) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(AuthContext);
  const [webref, setWebref] = useState();
  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);
  const [answerId, setAnswerId] = useState(null);
  const [contentToEdit, setContentToEdit] = useState('');
  const [commentsOnQuestionInput, setCommentsOnQuestionInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const [commentsOnQuestion, setCommentsOnQuestion] = useState([]);
  const [showCommentBoxForQuestion, setShowCommentBoxForQuestion] = useState(
    false,
  );

  useEffect(() => {
    const qid = props.route.params.questionID;
    setQuestionId(qid);
    props.question && setQuestionId(props.question);
  }, [props.question, props.route.params.questionID]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { _data } = await firestore()
          .collection('questions')
          .doc(questionId)
          .get();
        await setQuestion(_data);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    const fetchAnswers = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('answers')
          .onSnapshot((querySnapshot) => {
            const ans = [];
            querySnapshot.forEach((documentSnapshot) => {
              ans.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setAnswers(ans);
          });
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    const fetchCommentOnQuestion = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('comments')
          .onSnapshot((querySnapshot) => {
            const comnts = [];
            querySnapshot.forEach((documentSnapshot) => {
              comnts.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setCommentsOnQuestion(comnts);
          });
      } catch (err) {
        console.log('error fetching commentsOnQuestion', err);
      }
    };

    !question && fetchQuestion();
    fetchAnswers();
    fetchCommentOnQuestion();
  }, [question, questionId]);

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const submitAnswer = async (str) => {
    if (answerId) {
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
      return;
    }

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
  };

  const submitCommentOnQuestion = async () => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('comments')
        .add({
          content: commentsOnQuestionInput,
          userDisplayName,
          userID,
          questionID: questionId,
        });
      setCommentsOnQuestionInput('');
      setShowCommentBoxForQuestion(false);
    } catch (err) {
      console.log('error creating comment:', contentToEdit);
    }
  };

  const updateSelectedComment = async (Id, commentContent) => {
    try {
      await firestore()
        .collection('questions')
        .doc(questionId)
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
        .doc(questionId)
        .collection('comments')
        .doc(Id)
        .delete();
    } catch (err) {
      console.log('error updating Comment:', err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {question && (
          <QuestionComponent
            question={question}
            navigation={props.navigation}
          />
        )}
        {commentsOnQuestion.map((comment, index) => (
          <View key={comment.id ? comment.id : index}>
            <CommentComponent
              id={comment.id}
              comment={comment}
              updateComment={updateSelectedComment}
              deleteComment={deleteSelectedComment}
            />
          </View>
        ))}
        {showCommentBoxForQuestion ? (
          <>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setCommentsOnQuestionInput(text)}
              value={commentsOnQuestionInput}
            />
            <Button title="Submit Comment" onPress={submitCommentOnQuestion} />
          </>
        ) : (
          <Text
            onPress={() =>
              setShowCommentBoxForQuestion(!showCommentBoxForQuestion)
            }>
            Comment on Question
          </Text>
        )}
        {answers.map((answer, index) => (
          <View key={answer.id || index}>
            <AnswerComponent
              setAnswer={setContentToEdit}
              setAnswerId={setAnswerId}
              answer={answer}
            />
          </View>
        ))}
        <Editor
          oldContent={contentToEdit}
          submit={submitAnswer}
          webref={webref}
          setWebref={setWebref}
        />
        <Button title="Submit Answer" onPress={submit} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
  scrollView: { marginHorizontal: 0 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  questionTitle: { fontSize: 18 },
  editor: {
    height: 100,
    width: 200,
  },
});

export default React.memo(QuestionDetailsScreen);
