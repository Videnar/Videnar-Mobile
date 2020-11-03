import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionTitle: '',
      questionBody: '',
    };
  }

  submitQuestion = async () => {
    try {
      const {questionTitle, questionBody} = this.state;
      await API.graphql(
        graphqlOperation(createQuestion, {input: {title: questionBody}}),
      );
      this.setState({questionTitle: ''});
      this.props.navigation.navigate('Home');
      console.log(questionTitle, questionBody);
    } catch (err) {
      console.log('error creating Question:', this.state.questionBody);
    }
  };

  setQuestionTitle = (questionTitle) => {
    this.setState({questionTitle});
  };

  setQuestionBody = (questionBody) => {
    this.setState({questionBody});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setQuestionTitle(text)}
          value={this.state.questionTitle}
        />
        <Editor setQuestionBody={this.setQuestionBody} />
        <Button title="Submit Question" onPress={this.submitQuestion} />
      </View>
    );
  }
}

export default QuestionScreen;
