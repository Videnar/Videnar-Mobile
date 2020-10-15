import React, {Component} from 'react';
import {View, Button, TextInput} from 'react-native';

import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from '../graphql/mutations';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }

  submitQuestion = async () => {
    try {
      const question = this.state.question;
      await API.graphql(
        graphqlOperation(createQuestion, {input: {title: question}}),
      );
      this.setState({question: ''});
      this.props.navigation.navigate('Home');
    } catch (err) {
      console.log('error creating Question:', err);
    }
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
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({question: text})}
          value={this.state.value}
        />
        <Button title="Submit Question" onPress={this.submitQuestion} />
      </View>
    );
  }
}

export default QuestionScreen;
