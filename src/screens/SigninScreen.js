import React, { useContext } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';

const SigninScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AuthComponent
        headerText="Hello there!"
        // errorMessage={state.errorMessage}
        onSubmit={signIn}
        forgotPassword
        submitButtonText="Login"
      />
      <NavLink text="Sign up here" routeName="Signup" />
      <Text style={styles.textStyle}>or</Text>
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
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SigninScreen;
