import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../contexts/AuthContext';

GoogleSignin.configure({
  webClientId:
    '1003541739972-63q1an14045tmqqo4t842un42f9jsd33.apps.googleusercontent.com',
});

const SocialAuthComponent = () => {
  const { changeScreen } = useContext(AuthContext);
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    changeScreen('Main');

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    changeScreen('Main');

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      {/* Google button*/}
      <Button
        type="clear"
        icon={<SocialIcon light raised type="google" />}
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
      />
      {/* Facebook button*/}
      <Button
        type="clear"
        icon={<SocialIcon raised type="facebook" />}
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with Facebook!'),
          )
        }
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
