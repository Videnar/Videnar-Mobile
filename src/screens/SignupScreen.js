import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-toast-message';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Text } from 'react-native-elements';
import { DEEP_GREEN } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
  const signUp = (emailID, password, name) => {
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
            navigation.navigate('Signin');
            user.sendEmailVerification();
            Toast.show({
              type: 'info',
              position: 'bottom',
              text1: 'Verify your email and then Sign in',
              text2:
                'We have sent a verification mail to your email address 🙂',
              visibilityTime: 20000,
              autoHide: true,
              topOffset: 40,
              bottomOffset: 40,
            });
          })
          .catch((error) => {
            console.log('Error setting user', error);
            crashlytics().log('Error setting user, Signup, SignupScreen');
            crashlytics().recordError(error);
          });
      })
      .catch((error) => {
        if (
          error.toString() ===
          'Error: [auth/email-already-in-use] The email address is already in use by another account.'
        ) {
          Toast.show({
            type: 'info',
            position: 'bottom',
            text1: 'This email is already in use',
            text2: 'Try signing up with a diferent email 🙂',
            visibilityTime: 3000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 40,
          });
        }
        crashlytics().log('Error signing up, SignupScreen, SignupScreen');
        crashlytics().recordError(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.logoContainer}>
          <Logo width={60} height={60} color={DEEP_GREEN} />
        </View>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> COMPONENT WILL UNMOUNT*/}
        <AuthComponent
          // errorMessage={state.errorMessage}
          submitButtonText="Register"
          nameInput
          onSubmit={signUp}
        />
        {/** Social Buttons */}
        <SocialAuth />
        {/** Navigation Links */}
        <View style={styles.textContainer}>
          <Spacer>
            <Text>Already have an account? </Text>
            <NavLink routeName="Signin" text="Sign In" />
          </Spacer>
        </View>
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
    paddingVertical: '5%',
  },
  logoContainer: {
    alignSelf: 'center',
    marginBottom: '12%',
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default SignupScreen;
