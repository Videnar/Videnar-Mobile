import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext';
import { Icon, Button } from 'native-base'
import Spacer from './Spacer';

const SocialAuthComponent = () => {
  const {socialAuth} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button
        iconRight
        transparent light bordered
        style={styles.buttonStyle}
        onPress={() => socialAuth('Google')}
      >
        <Icon name='google' type='FontAwesome' style={{ color: 'red' }} />
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>SIGN IN WITH GOOGLE</Text>
      </Button>
      <Spacer />
      <Button
        iconRight
        transparent light bordered
        style={styles.buttonStyle}
        onPress={() => socialAuth('Facebook')}
      >
        <Icon name='facebook-square' type='FontAwesome' style={{ color: 'blue' }} />
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}> SIGN IN WITH FACEBOOK</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  buttonStyle: {
    borderColor: '#d3d6db',
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 8
  }
});

export default SocialAuthComponent;
