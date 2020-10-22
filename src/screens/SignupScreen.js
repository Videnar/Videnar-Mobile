import React from 'react';
import {Button, View, StyleSheet} from 'react-native';
// import {NavigationEvents} from 'react-navigation';
import {Auth} from 'aws-amplify';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuth';

const SignupScreen = ({navigation}) => {
  const signUp = async (email, password) => {
    try {
      const {user} = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      console.log(user);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error signing up:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <AuthComponent
        headerText="Sign Up for Videnar"
        // errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead!"
      />
      <SocialAuth />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
});

export default SignupScreen;
