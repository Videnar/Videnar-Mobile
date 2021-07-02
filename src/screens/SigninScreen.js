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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../contexts';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Text } from 'react-native-elements';
import { DEEP_GREEN } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import Toast from 'react-native-toast-message';

const SigninScreen = ({ navigation }) => {
  const { changeScreen, setUser, updateUserPreferences } = useContext(Context);
  const signIn = (emailID, password) => {
    try {
      auth()
        .signInWithEmailAndPassword(emailID, password)
        .then(async (userCredential) => {
          const { displayName, email, photoURL, uid } = userCredential.user;
          await setUser({
            userDisplayName: displayName,
            email,
            photoURL,
            userID: uid,
          });
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
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error while getting Document',
                text2: error,
                visibilityTime: 10000,
                autoHide: true,
                topOffset: 40,
                bottomOffset: 40,
              });
            });
        })
        .catch((error) => {
          console.error(error);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error while SignIn',
            text2: error,
            visibilityTime: 10000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        });
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Logo width={60} height={60} color={DEEP_GREEN} />
          <Text style={styles.logoTextStyle}>Videnar</Text>
        </View>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <AuthComponent
          headerText="Sign In"
          // errorMessage={state.errorMessage}
          onSubmit={signIn}
          forgotPassword
          submitButtonText="Login"
        />
        <NavLink text="Sign Up Here" routeName="Signup" />
        <SocialAuth />
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
  },
  logoTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: DEEP_GREEN,
    marginTop: 5,
  },
});

export default SigninScreen;
