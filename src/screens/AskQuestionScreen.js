import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  submitQuestion = async () => {
    try {
      const {title, content} = this.state;
      await API.graphql(
        graphqlOperation(createQuestion, {
          input: {
            title: title,
            content: content,
            upvotes: 0,
            view: 0,
            tags: 'neet',
            noOfBookmarks: 0,
          },
        }),
      );
      this.setState({title: ''});
      this.props.navigation.navigate('Home');
    } catch (err) {
      console.log('error creating Question:', this.state.content);
    }
  };

  setTitle = (title) => {
    this.setState({title});
  };

  setContent = (content) => {
    this.setState({content});
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
          onChangeText={(text) => this.setTitle(text)}
          value={this.state.title}
        />
        <Editor setContent={this.setContent} />
        <Button title="Submit Question" onPress={this.submitQuestion} />
      </View>
    );
  }
}

export default QuestionScreen;
