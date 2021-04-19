import React, { useContext, useEffect } from 'react';
import { Linking, View, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { Icon, Button } from 'native-base';
import Spacer from './Spacer';
import { navigate } from '../navigation/RootNavigation';

const SocialAuthComponent = () => {
  const { socialAuth } = useContext(AuthContext);

  useEffect(() => {
    Linking.addEventListener('url', openWebViewScreen());
  });

  const openWebViewScreen = async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log(initialUrl, 'initialUrl');
    initialUrl && navigate('WebView', { uri: initialUrl });
  };

  return (
    <View style={styles.container}>
      <Button
        transparent
        light
        bordered
        style={styles.buttonStyle}
        onPress={() => {
          socialAuth('Google');
        }}>
        <Icon name="google" type="FontAwesome" style={styles.googleIcon} />
      </Button>
      <Spacer />
      <Button
        transparent
        light
        bordered
        style={styles.buttonStyle}
        onPress={() => {
          socialAuth('Facebook');
        }}>
        <Icon
          name="facebook-square"
          type="FontAwesome"
          style={styles.facebookIcon}
        />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonStyle: {
    borderColor: '#d3d6db',
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  googleIcon: {
    color: 'red',
    fontSize: 35,
  },
  facebookIcon: {
    color: 'blue',
    fontSize: 35,
  },
});

export default SocialAuthComponent;
