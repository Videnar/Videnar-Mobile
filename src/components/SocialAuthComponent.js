import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import {Icon, Button} from 'native-base';
import Spacer from './Spacer';

const SocialAuthComponent = () => {
  const {socialAuth} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Button
        transparent
        light
        bordered
        style={styles.buttonStyle}
        onPress={() => socialAuth('Google')}>
        <Icon name="google" type="FontAwesome" style={{color: 'red'}} />
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          Sign In with Google
        </Text>
      </Button>
      <Spacer />
      <Button
        transparent
        light
        bordered
        style={styles.buttonStyle}
        onPress={() => socialAuth('Facebook')}>
        <Icon
          name="facebook-square"
          type="FontAwesome"
          style={{color: 'blue'}}
        />
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          Sign In with Facebook
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonStyle: {
    borderColor: '#d3d6db',
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default SocialAuthComponent;
