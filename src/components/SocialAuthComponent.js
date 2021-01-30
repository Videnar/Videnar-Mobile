import React, {useContext} from 'react';
import {Linking, Text, View, StyleSheet} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {AuthContext} from '../contexts/AuthContext';
import {Icon, Button} from 'native-base';
import Spacer from './Spacer';
import getDeepLink from '../utilities/getDeepLink';

const SocialAuthComponent = () => {
  const {socialAuth} = useContext(AuthContext);

  const onSignin = async () => {
    const deepLink = getDeepLink('');
    console.log(deepLink);
    const url = `https://my-auth-login-page.com?redirect_uri=${deepLink}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Linking.openURL(url);
    }
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
          // onSignin();
        }}>
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
        onPress={() => {
          socialAuth('Facebook');
          // onSignin();
        }}>
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
