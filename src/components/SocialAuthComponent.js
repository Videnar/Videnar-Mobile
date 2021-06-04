import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { SocialIcon, Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Context } from '../contexts';

GoogleSignin.configure({
  webClientId:
    '492932528639-jcas4av97bd4t80jvhd86p2fl7711amp.apps.googleusercontent.com',
});

const SocialAuthComponent = () => {
  const { changeScreen, setUser, updateUserPreferences } = useContext(Context);

  const getUserData = async () => {
    const {
      displayName,
      email,
      photoURL,
      uid,
      metadata: { creationTime, lastSignInTime },
    } = auth().currentUser;
    await setUser({
      userDisplayName: displayName,
      email,
      photoURL,
      userID: uid,
    });
    if (creationTime === lastSignInTime) {
      changeScreen('UserPref');
    } else {
      var docRef = firestore().collection('users').doc(uid);
      docRef
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            const { education, branch, exams } = doc.data();
            const userPref = { education, branch, exams };
            updateUserPreferences(userPref);
            const str = JSON.stringify(userPref);
            await AsyncStorage.setItem('@preferences', str);
            changeScreen('Main');
          } else {
            changeScreen('UserPref');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  };
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
      getUserData();
    } catch (err) {
      console.log('Error ---> ' + err);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      getUserData();
    } catch (err) {
      console.log('Error ---> ' + err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        type="clear"
        icon={<SocialIcon light raised type="google" />}
        onPress={onGoogleButtonPress}
      />

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
