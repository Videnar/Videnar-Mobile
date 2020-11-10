import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Auth} from 'aws-amplify';
import Spacer from './Spacer';

const SocialAuth = ({navigation}) => {
  const authenticate = async (provider) => {
    Auth.federatedSignIn({provider});
    const user = await Auth.currentAuthenticatedUser().catch((err) =>
      console.log(err),
    );
    navigation.navigate('Home');
  };
  return (
    <View>
      <Spacer />
      <Button
        title="Sign In with Google"
        onPress={() => authenticate('Google')}
      />
      <Spacer />
      <Button
        title="Sign In with Facebook"
        onPress={() => authenticate('Facebook')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default withNavigation(SocialAuth);
