import React, {Component} from 'react';
import {Text, View} from 'react-native';

class ProfileScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Profile!</Text>
      </View>
    );
  }
}

export default ProfileScreen;
