import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="Question"
          onPress={() => this.props.navigation.navigate('Question')}
        />
      </View>
    );
  }
}

export default HomeScreen;
