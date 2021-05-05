import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import { Header } from 'react-native-elements';

const SignupScreen = ({ navigation }) => {
  const { setUser, changeScreen } = useContext(AuthContext);
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
              changeScreen('Main');
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
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        placement="left"
        centerComponent={{ text: 'Videnar', style: styles.headerText }}
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
        <NavLink routeName="Signin" text="Sign In Instead!" />
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

export default SignupScreen;
