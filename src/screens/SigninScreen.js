import React, {useContext} from 'react';
import {Linking, Text, View, StyleSheet} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {AuthContext} from '../contexts/AuthContext';
import AuthComponent from '../components/AuthComponent';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuthComponent';
import Spacer from '../components/Spacer';
import getDeepLink from '../utilities/getDeepLink';

const SigninScreen = ({navigation}) => {
  const {signIn} = useContext(AuthContext);

  const onLogin = async () => {
    const deepLink = getDeepLink('callback');
    const url = `https://my-auth-login-page.com?redirect_uri=${deepLink}`;
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, deepLink, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        }).then((response) => {
          if (response.type === 'success' && response.url) {
            Linking.openURL(response.url);
          }
        });
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <AuthComponent
        headerText="Sign into Videnar"
        // errorMessage={state.errorMessage}
        onSubmit={signIn}
        forgotPassword
        submitButtonText="SIGN IN"
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
    backgroundColor: '#ffede6',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SigninScreen;
