import React, {Component} from 'react';
import {Text, View} from 'react-native';

class QuestionScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>QuestionScreen!</Text>
      </View>
    );
  }
}

export default QuestionScreen;
