import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Context } from '../contexts';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Text } from 'react-native-elements';
import { DEEP_GREEN } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupScreen = ({ navigation }) => {
  const { setUser, changeScreen } = useContext(Context);
  const signUp = (emailID, password, name) => {
    try {
      auth()
        .createUserWithEmailAndPassword(emailID, password)
        .then(() => {
          let user = auth().currentUser;
          user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              user = auth().currentUser;
              const { displayName, email, photoURL, uid } = user;
              setUser({
                userDisplayName: displayName,
                email,
                photoURL,
                userID: uid,
              });
              changeScreen('UserPref', 'Auth');
            })
            .catch((error) => {
              console.log('Error setting user', error);
            });
          console.log('User account created & signed in!', user);
        })
        .catch((error) => {
          console.error(error);
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
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> COMPONENT WILL UNMOUNT*/}
        <AuthComponent
          headerText="Sign Up"
          // errorMessage={state.errorMessage}
          submitButtonText="Register"
          nameInput
          onSubmit={signUp}
        />
        <NavLink routeName="Signin" text="Sign In Instead!" />
        <SocialAuth />
      </ScrollView>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: false,
  };
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

export default SignupScreen;
