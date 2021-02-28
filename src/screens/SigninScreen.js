import React, { useContext } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import Spacer from '../components/Spacer';
import { AUTH_BACKGROUND } from '../assets/colors/colors';

const SigninScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <StatusBar barStyle="dark-content" backgroundColor={AUTH_BACKGROUND} />
      <AuthComponent
        headerText="Login"
        // errorMessage={state.errorMessage}
        onSubmit={signIn}
        forgotPassword
        submitButtonText="Sign In"
      />
      <Spacer />
      <Text style={styles.textStyle}>Don't have an account?</Text>
      <NavLink text="Sign up here" routeName="Signup" />
      <Text style={styles.textStyle}>or</Text>
      <Spacer />
      <SocialAuth />
    </View>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
    backgroundColor: AUTH_BACKGROUND,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SigninScreen;
