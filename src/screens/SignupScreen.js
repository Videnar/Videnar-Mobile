import React, {useContext} from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';

const SignupScreen = ({navigation}) => {
  const {signUp} = useContext(AuthContext);
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
