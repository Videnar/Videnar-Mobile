import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../contexts';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Text } from 'react-native-elements';
import { DEEP_GREEN } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import Toast from 'react-native-toast-message';
import Spacer from '../components/Spacer';

const SigninScreen = ({ navigation }) => {
  const { changeScreen, setUser, updateUserPreferences } = useContext(Context);

  const saveUserInFirebase = (uid) => {
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
          changeScreen('Main', 'Auth');
        } else {
          changeScreen('UserPref', 'Auth');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
        crashlytics().log('Error getting document, signIn, SigninScreen');
        crashlytics().recordError(error);
      });
  };

  const signIn = (emailID, password) => {
    auth()
      .signInWithEmailAndPassword(emailID, password)
      .then(async (userCredential) => {
        const { displayName, email, emailVerified, photoURL, uid } =
          userCredential.user;
        if (emailVerified) {
          await setUser({
            userDisplayName: displayName,
            email,
            photoURL,
            userID: uid,
          });
          saveUserInFirebase(uid);
        } else {
          userCredential.user.sendEmailVerification();
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'Verify your email and then Sign in',
            text2: 'We have sent a verification mail to your email address 🙂',
            visibilityTime: 20000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        crashlytics().log(
          'User Email or Password is incorrect, signIn, SigninScreen',
        );
        crashlytics().recordError(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'User Email or Password is incorrect',
          text2: 'Oops! 🤦‍♂️',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Logo width={60} height={60} color={DEEP_GREEN} />
        </View>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <AuthComponent
          // errorMessage={state.errorMessage}
          onSubmit={signIn}
          forgotPassword
          submitButtonText="Login"
        />
        {/** Social Buttons */}
        <SocialAuth />
        {/** Navigation Links */}
        <View style={styles.textContainer}>
          <Spacer>
            <Text>Don't have an account? </Text>
            <NavLink text="Sign Up" routeName="Signup" />
          </Spacer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: DEEP_GREEN,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: '5%',
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: '20%',
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default SigninScreen;
