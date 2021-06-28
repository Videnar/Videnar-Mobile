import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon, Button, Header, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import Spacer from '../components/Spacer';
import EmailInput from '../components/InputComponents/EmailInput';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState({ email: false });

  const onSubmitHandler = () => {
    const emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailFormat)) {
      setHasError({ email: true });
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          navigation.goBack();
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Please, check your email to reset Password.',
            text2: '🙂🙂🙂',
            visibilityTime: 500,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        })
        .catch(function (error) {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Opps! Something went wrong.',
            text2: 'Please, try again 😶',
            visibilityTime: 500,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        });
    }
  };
  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon
            name="arrow-back"
            onPress={() => navigation.goBack()}
            size={30}
          />
        }
        backgroundColor="white"
      />
      <ScrollView style={styles.container}>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <View style={styles.logoContainer}>
          <Logo width={60} height={60} color={DEEP_GREEN} />
          <Text style={styles.logoTextStyle}>Videnar</Text>
        </View>
        <View style={styles.inputContainer}>
          <Spacer>
            <Text style={styles.headerText}>Reset Password</Text>
          </Spacer>
          <Spacer />
          <EmailInput
            email={email}
            setEmail={setEmail}
            hasError={hasError.email}
            setHasError={setHasError}
          />
          <Button
            type="clear"
            raised
            title="Continue"
            onPress={onSubmitHandler}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
        <Spacer />
        <Spacer />
      </ScrollView>
    </>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: GREY,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
  },
  logoTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
    color: DEEP_GREEN,
    marginTop: 5,
  },
  inputContainer: {
    height: '40%',
    width: '90%',
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default SigninScreen;
