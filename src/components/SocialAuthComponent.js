import React, {useContext} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Context as AuthContext} from '../contexts/AuthContext';
import Spacer from './Spacer';

const SocialAuthComponent = ({navigation}) => {
  const {socialAuth} = useContext(AuthContext);
  return (
    <View>
      <Spacer />
      <Button
        title="Sign In with Google"
        onPress={() => socialAuth('Google')}
      />
      <Spacer />
      <Button
        title="Sign In with Facebook"
        onPress={() => socialAuth('Facebook')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default withNavigation(SocialAuthComponent);
