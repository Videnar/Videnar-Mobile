import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {
  createAnswer,
  updateAnswer,
  createCommentOnQuestion,
  deleteCommentOnQuestion,
  updateCommentOnQuestion,
} from '../graphql/mutations';
import {listAnswers, listCommentOnQuestions} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import Editor from '../components/Editor';
import CommentComponent from '../components/CommentComponent';
import {AuthContext} from '../contexts/AuthContext';

const QuestionDetailsScreen = (props) => {
  const {
    state: {username},
  } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [answerId, setAnswerId] = useState(null);
  const [content, setContent] = useState('');
  const [commentsOnQuestionInput, setCommentsOnQuestionInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const [commentsOnQuestion, setCommentsOnQuestion] = useState([]);
  const [showCommentBoxForQuestion, setShowCommentBoxForQuestion] = useState(
    false,
  );

  useEffect(() => {
    const {question} = props.route.params;
    const {id: qid} = question;
    setId(qid);

    const fetchAnswers = async () => {
      try {
        const list = await API.graphql({
          query: listAnswers,
          variables: {
            filter: {questionID: {eq: id}},
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
            filter: {questionID: {eq: id}},
          },
        });
        const commentsOnQuestionList = list.data.listCommentOnQuestions.items;
        setCommentsOnQuestion(commentsOnQuestionList);
      } catch (err) {
        console.log('error fetching commentsOnQuestion', err);
      }
    };
    fetchAnswers();
    fetchCommentOnQuestion();
  }, [id, props.route.params]);

  const submitAnswer = async () => {
    if (answerId) {
      try {
        await API.graphql({
          query: updateAnswer,
          variables: {
            input: {
              id: answerId,
              content,
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
            questionID: id,
            content,
            upvotes: 0,
          },
        }),
      );
    } catch (err) {
      console.log('error creating Answer:', content);
    }
  };

  const submitCommentOnQuestion = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCommentOnQuestion, {
          input: {
            username,
            questionID: id,
            content: commentsOnQuestionInput,
          },
        }),
      );
      setCommentsOnQuestionInput('');
      setShowCommentBoxForQuestion(false);
    } catch (err) {
      console.log('error creating comment:', content);
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
          input: {id: Id},
        },
      });
    } catch (err) {
      console.log('error updating Comment:', err);
    }
  };

  const {question} = props.route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView style={styles.scrollView}>
        <QuestionComponent question={question} />
        {commentsOnQuestion.map((comment, index) => (
          <View key={comment.id ? comment.id : index}>
            <CommentComponent
              id={comment.id}
              comment={comment.content}
              updateComment={updateSelectedComment}
              deleteComment={deleteSelectedComment}
            />
          </View>
        ))}
        {showCommentBoxForQuestion ? (
          <>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
              }}
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
              setAnswer={setContent}
              setAnswerId={setAnswerId}
              answer={answer}
            />
          </View>
        ))}
        <Editor content={content} setContent={setContent} />
        <Button title="Submit Answer" onPress={submitAnswer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  scrollView: {marginHorizontal: 0},
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
});

export default QuestionDetailsScreen;
