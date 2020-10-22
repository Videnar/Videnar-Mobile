import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {Auth} from 'aws-amplify';

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
        <Button
          title="Sign Out"
          onPress={async () => {
            await Auth.signOut();
            this.props.navigation.navigate('Signin');
          }}
        />
      </View>
    );
  }
}

export default ProfileScreen;
