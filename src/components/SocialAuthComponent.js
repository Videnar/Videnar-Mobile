import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Context } from '../contexts';

GoogleSignin.configure({
  webClientId:
    '492932528639-jcas4av97bd4t80jvhd86p2fl7711amp.apps.googleusercontent.com',
});

const SocialAuthComponent = () => {
  const { changeScreen, setUser } = useContext(Context);

  const onFacebookButtonPress = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      await auth().signInWithCredential(facebookCredential);
      const { displayName, email, photoURL, uid } = auth().currentUser;
      setUser({
        userDisplayName: displayName,
        email,
        photoURL,
        userID: uid,
      });
      changeScreen('Main');
    } catch (err) {
      console.log('Error ---> ' + err);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      const { displayName, email, photoURL, uid } = auth().currentUser;
      setUser({
        userDisplayName: displayName,
        email,
        photoURL,
        userID: uid,
      });
      changeScreen('Main');
    } catch (err) {
      console.log('Error ---> ' + err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Google button*/}
      <Button
        type="clear"
        icon={<SocialIcon light raised type="google" />}
        onPress={onGoogleButtonPress}
      />
      {/* Facebook button*/}
      <Button
        type="clear"
        icon={<SocialIcon raised type="facebook" />}
        onPress={onFacebookButtonPress}
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
