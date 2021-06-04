import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context } from '../contexts';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Header } from 'react-native-elements';

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
                changeScreen('Main');
              } else {
                changeScreen('UserPref');
              }
            })
            .catch((error) => {
              console.log('Error getting document:', error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        placement="left"
        centerComponent={{ text: 'Videnar', style: styles.headerText }}
        backgroundColor="white"
      />
      <View style={styles.container}>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <AuthComponent
          headerText="Hello there!"
          // errorMessage={state.errorMessage}
          onSubmit={signIn}
          forgotPassword
          submitButtonText="Login"
        />
        <NavLink text="Sign Up Here" routeName="Signup" />
        <SocialAuth />
      </View>
    </>
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
    color: '#A97CB0',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SigninScreen;
