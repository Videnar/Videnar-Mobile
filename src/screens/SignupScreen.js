import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import Spacer from '../components/Spacer';

const SignupScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> COMPONENT WILL UNMOUNT*/}
      <AuthComponent
        headerText="Sign Up for Videnar"
        // errorMessage={state.errorMessage}
        submitButtonText="SIGN UP"
        nameInput
        onSubmit={signUp}
      />
      <Spacer />
      <Text style={styles.textStyle}>Already have an account?</Text>
      <NavLink routeName="Signin" text="Sign in instead!" />
      <Text style={styles.textStyle}>or</Text>
      <Spacer />
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
    marginBottom: 50,
    backgroundColor: '#ffede6',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignupScreen;
