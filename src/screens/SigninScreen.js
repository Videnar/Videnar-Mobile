import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Context } from '../contexts';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Header } from 'react-native-elements';

const SigninScreen = ({ navigation }) => {
  const { changeScreen, setUser } = useContext(Context);
  const signIn = (emailID, password) => {
    try {
      auth()
        .signInWithEmailAndPassword(emailID, password)
        .then((userCredential) => {
          const { displayName, email, photoURL, uid } = userCredential.user;
          setUser({
            userDisplayName: displayName,
            email,
            photoURL,
            userID: uid,
          });
          changeScreen('Main');
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
