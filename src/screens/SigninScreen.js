import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';

const SigninScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <AuthComponent
        headerText="Sign into Your Account"
        // errorMessage={state.errorMessage}
        onSubmit={signIn}
        forgotPassword
        submitButtonText="SIGN IN"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
      />
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
  },
});

export default SigninScreen;
