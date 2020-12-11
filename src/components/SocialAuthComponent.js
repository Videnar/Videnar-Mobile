import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Button, SocialIcon} from 'react-native-elements';
import {Context as AuthContext} from '../contexts/AuthContext';
import Spacer from './Spacer';

const SocialAuthComponent = ({navigation}) => {
  const {socialAuth} = useContext(AuthContext);
  return (
    <View>
      <SocialIcon
        title= 'Sign In With Google'
        button
        type='google'
        onPress={() => socialAuth('Google')}
      />
      <SocialIcon
        title='Sign In With Facebook'
        button
        type='facebook'
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
