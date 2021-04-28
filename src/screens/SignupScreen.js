import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Header } from 'react-native-elements';

const SignupScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        backgroundColor="white"
      />
      <View style={styles.container}>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> COMPONENT WILL UNMOUNT*/}
        <AuthComponent
          headerText="Welcome Aboard!"
          // errorMessage={state.errorMessage}
          submitButtonText="Register"
          nameInput
          onSubmit={signUp}
        />
        <NavLink routeName="Signin" text="Sign in instead!" />
        <Text style={styles.textStyle}>or</Text>
        <SocialAuth />
      </View>
    </>
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
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignupScreen;
