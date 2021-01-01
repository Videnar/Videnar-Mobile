import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext';

const SocialAuthComponent = ({ navigation }) => {
  const { socialAuth } = useContext(AuthContext);
  return (
    <View>
      <Button
        title="Sign In With Google"
        button
        onPress={() => socialAuth('Google')}
      />
      <Button
        title="Sign In With Facebook"
        button
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

export default SocialAuthComponent;
