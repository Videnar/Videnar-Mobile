import React, {Component} from 'react';
import {Text, View} from 'react-native';

class ActivityScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Activity!</Text>
      </View>
    );
  }
}

export default ActivityScreen;
