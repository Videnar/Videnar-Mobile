import React, { useContext } from 'react';
import { Linking, View, StyleSheet } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { AuthContext } from '../contexts/AuthContext';
import { SocialIcon, Button } from 'react-native-elements';
import getDeepLink from '../utilities/getDeepLink';

const SocialAuthComponent = () => {
  const { socialAuth } = useContext(AuthContext);

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
      {/* Google button*/}
      <Button
        type="clear"
        icon={<SocialIcon light raised type="google" />}
        onPress={() => {
          socialAuth('Google');
          // onSignin();
        }}
      />
      {/* Facebook button*/}
      <Button
        type="clear"
        icon={<SocialIcon raised type="facebook" />}
        onPress={() => {
          socialAuth('Facebook');
          // onSignin();
        }}
      />
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
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default SocialAuthComponent;
