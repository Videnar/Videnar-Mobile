import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createAnswer,
  updateAnswer,
  createCommentOnQuestion,
  deleteCommentOnQuestion,
  updateCommentOnQuestion,
} from '../graphql/mutations';
import {
  getQuestion,
  listAnswers,
  listCommentOnQuestions,
} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import Editor from '../components/Editor';
import CommentComponent from '../components/CommentComponent';
import { AuthContext } from '../contexts/AuthContext';

const QuestionDetailsScreen = (props) => {
  const {
    state: { username },
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

  console.log('opened by the link');

  useEffect(() => {
    const qid = props.route.params.questionID;
    setQuestionId(qid);
  }, [props.route.params.questionID]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const result = await API.graphql(
          graphqlOperation(getQuestion, { id: questionId }),
        );
        await setQuestion(result.data.getQuestion);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    const fetchAnswers = async () => {
      try {
        const list = await API.graphql({
          query: listAnswers,
          variables: {
            filter: { questionID: { eq: questionId } },
          },
        });
        const answerslist = list.data.listAnswers.items;
        setAnswers(answerslist);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    const fetchCommentOnQuestion = async () => {
      try {
        const list = await API.graphql({
          query: listCommentOnQuestions,
          variables: {
            filter: { questionID: { eq: questionId } },
          },
        });
        const commentsOnQuestionList = list.data.listCommentOnQuestions.items;
        setCommentsOnQuestion(commentsOnQuestionList);
      } catch (err) {
        console.log('error fetching commentsOnQuestion', err);
      }
    };

    fetchQuestion();
    fetchAnswers();
    fetchCommentOnQuestion();
  }, [questionId]);

  const submit = () => {
    const code = 'window.ReactNativeWebView.postMessage(quill.root.innerHTML);';
    webref.injectJavaScript(code);
  };

  const submitAnswer = async (str) => {
    if (answerId) {
      try {
        await API.graphql({
          query: updateAnswer,
          variables: {
            input: {
              id: answerId,
              content: str,
            },
          },
        });
      } catch (err) {
        console.log('error updating Answer:', err);
      }
      return;
    }

    try {
      await API.graphql(
        graphqlOperation(createAnswer, {
          input: {
            username,
            questionID: questionId,
            content: str,
            upvotes: 0,
          },
        }),
      );
    } catch (err) {
      console.log('error creating Answer:', err);
    }
  };

  const submitCommentOnQuestion = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCommentOnQuestion, {
          input: {
            username,
            questionID: questionId,
            content: commentsOnQuestionInput,
          },
        }),
      );
      setCommentsOnQuestionInput('');
      setShowCommentBoxForQuestion(false);
    } catch (err) {
      console.log('error creating comment:', contentToEdit);
    }
  };

  const updateSelectedComment = async (Id, commentContent) => {
    try {
      await API.graphql({
        query: updateCommentOnQuestion,
        variables: {
          input: {
            id: Id,
            content: commentContent,
          },
        },
      });
    } catch (err) {
      console.log('error updating Comment:', err);
    }
  };

  const deleteSelectedComment = async (Id) => {
    try {
      await API.graphql({
        query: deleteCommentOnQuestion,
        variables: {
          input: { id: Id },
        },
      });
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
