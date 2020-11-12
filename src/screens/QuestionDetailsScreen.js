import React, {Component} from 'react';
import {Text, Button, View, StyleSheet, ScrollView} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createAnswer} from '../graphql/mutations';
import {getQuestion} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import Editor from '../components/Editor';

class QuestionDetailsScreen extends Component {
  constructor(props) {
    super(props);
    const {question} = this.props.navigation.state.params;
    const {id} = question;
    this.state = {
      question,
      answerInput: '',
      answers: [],
      questionID: id,
      showCommentBoxForQuestion: false,
      showCommentBoxForAnswer: false,
    };
  }

  componentDidMount() {
    this.fetchAnswers(this.state.questionID);
  }

  fetchAnswers = async (questionID) => {
    try {
      const questionData = await API.graphql(
        graphqlOperation(getQuestion, {id: questionID}),
      );
      const {answers, commentsOnQuestion} = questionData.data;
      console.log(questionData.data.getQuestion.answers, 'answers bitch');
      // this.setState({
      //   answers: [...this.state.answers, ...answers],
      // });
    } catch (err) {
      console.log('error fetching answers', err);
    }
  };

  setAnswer = (answerInput) => {
    this.setState({answerInput});
  };

  submitAnswer = async () => {
    try {
      const {answer, questionID} = this.state;
      await API.graphql(
        graphqlOperation(createAnswer, {
          input: {
            questionID,
            content: answer,
            upvotes: 0,
          },
        }),
      );
      // this.setState({title: ''});
      // this.props.navigation.navigate('Home');
    } catch (err) {
      console.log('error creating Answer:', this.state.content);
    }
  };

  render() {
    const {question, answers} = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScrollView style={styles.scrollView}>
          <QuestionComponent question={question} />
          <Text>Comment on Question</Text>
          {answers.map((answer, index) => (
            <View key={answer.id ? answer.id : index}>
              <AnswerComponent answer={answer} />
            </View>
          ))}
          <Editor setContent={this.setAnswer} />
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
