import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion, updateQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
  }

  submitQuestion = async () => {
    if (this.props.route.params) {
      this.updateQuestion();
    }
    try {
      const {content} = this.state;
      await API.graphql(
        graphqlOperation(createQuestion, {
          input: {
            content: content,
            upvotes: 0,
            view: 0,
            tags: 'neet',
            noOfBookmarks: 0,
          },
        }),
      );
      this.props.navigation.navigate('Home');
    } catch (err) {
      console.log('error creating Question:', this.state.content);
    }
  };

  updateQuestion = async (n) => {
    const {id} = this.props.route.params;
    const {content} = this.state;
    try {
      await API.graphql({
        query: updateQuestion,
        variables: {
          input: {
            id,
            content,
          },
        },
      });
    } catch (err) {
      console.log('error updating Question:', err);
    }
  };

  setContent = (content) => {
    this.setState({content});
  };

  render() {
    const {content} = this.props.route.params;
    return (
      <View style={styles.container}>
        <Editor setContent={this.setContent} content={content} />
        <Button title="Submit Question" onPress={this.submitQuestion} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionScreen;
