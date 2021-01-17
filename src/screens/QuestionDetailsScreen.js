import React, {Component} from 'react';
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

class QuestionDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      answerId: null,
      content: '',
      commentsOnQuestionInput: '',
      answers: [],
      commentsOnQuestion: [],
      commentsOnAnswer: [],
      showCommentBoxForQuestion: false,
    };
  }

  componentDidMount() {
    const {question} = this.props.route.params;
    const {id} = question;
    this.fetchAnswers(id);
    this.fetchCommentOnQuestion(id);
  }

  fetchAnswers = async (id) => {
    try {
      const list = await API.graphql({
        query: listAnswers,
        variables: {
          filter: {questionID: {eq: id}},
        },
      });
      const answers = list.data.listAnswers.items;
      this.setState({
        answers: [...this.state.answers, ...answers],
      });
    } catch (err) {
      console.log('error fetching answers', err);
    }
  };

  fetchCommentOnQuestion = async (id) => {
    try {
      const list = await API.graphql({
        query: listCommentOnQuestions,
        variables: {
          filter: {questionID: {eq: id}},
        },
      });
      const commentsOnQuestion = list.data.listCommentOnQuestions.items;
      this.setState({
        commentsOnQuestion: [
          ...this.state.commentsOnQuestion,
          ...commentsOnQuestion,
        ],
      });
    } catch (err) {
      console.log('error fetching commentsOnQuestion', err);
    }
  };

  setAnswer = (content) => {
    this.setState({content});
  };

  setAnswerId = (answerId) => {
    this.setState({answerId});
  };

  submitAnswer = async () => {
    const {answerId, content} = this.state;
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
      const {question} = this.props.route.params;
      const {id} = question;
      await API.graphql(
        graphqlOperation(createAnswer, {
          input: {
            questionID: id,
            content,
            upvotes: 0,
          },
        }),
      );
    } catch (err) {
      console.log('error creating Answer:', this.state.content);
    }
  };

  submitCommentOnQuestion = async () => {
    try {
      const {question} = this.props.route.params;
      const {id} = question;
      const {commentsOnQuestionInput} = this.state;
      await API.graphql(
        graphqlOperation(createCommentOnQuestion, {
          input: {
            questionID: id,
            content: commentsOnQuestionInput,
          },
        }),
      );
      this.setState({
        commentsOnQuestionInput: '',
        showCommentBoxForQuestion: false,
      });
    } catch (err) {
      console.log('error creating comment:', this.state.content);
    }
  };

  updateSelectedComment = async (Id, commentContent) => {
    console.log(Id, commentContent, 'UPDATE');
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

  deleteSelectedComment = async (Id) => {
    console.log(Id, 'DELETE');
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

  render() {
    const {question} = this.props.route.params;
    const {
      commentsOnQuestion,
      answers,
      content,
      commentsOnQuestionInput,
      showCommentBoxForQuestion,
    } = this.state;
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
                updateComment={this.updateSelectedComment}
                deleteComment={this.deleteSelectedComment}
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
                onChangeText={(text) =>
                  this.setState({
                    commentsOnQuestionInput: text,
                  })
                }
                value={commentsOnQuestionInput}
              />
              <Button
                title="Submit Comment"
                onPress={this.submitCommentOnQuestion}
              />
            </>
          ) : (
            <Text
              onPress={() =>
                this.setState({
                  showCommentBoxForQuestion: !showCommentBoxForQuestion,
                })
              }>
              Comment on Question
            </Text>
          )}
          {answers.map((answer, index) => (
            <View key={answer.id || index}>
              <AnswerComponent
                setAnswer={this.setAnswer}
                setAnswerId={this.setAnswerId}
                answer={answer}
              />
            </View>
          ))}
          <Editor content={content} setContent={this.setAnswer} />
          <Button title="Submit Answer" onPress={this.submitAnswer} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  scrollView: {marginHorizontal: 0},
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
});

export default QuestionDetailsScreen;
