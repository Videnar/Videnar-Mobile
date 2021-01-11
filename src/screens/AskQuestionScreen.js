import React, {Component} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from '../graphql/mutations';
import Editor from '../components/Editor';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '<p><br></p>',
    };
  }

  submitQuestion = async () => {
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

  setContent = (content) => {
    this.setState({content});
  };

  render() {
    return (
      <View style={styles.container}>
        <Editor setContent={this.setContent} content={this.state.content} />
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
