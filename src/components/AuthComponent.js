import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../navigation/RootNavigation';
import { Button } from 'react-native-elements';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import EmailInput from './InputComponents/EmailInput';
import NameInput from './InputComponents/NameInput';
import PasswordInput from './InputComponents/PasswordInput';

const AuthForm = ({
  headerText,
  errorMessage,
  onSubmit,
  nameInput,
  submitButtonText,
  forgotPassword,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState({
    name: false,
    email: false,
    password: false,
  });

  const onSubmitForm = () => {
    let { nameError, emailError, pwdError } = {
      nameError: false,
      emailError: false,
      pwdError: false,
    };
    const emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === '') {
      nameError = true;
    }
    if (!email.match(emailFormat)) {
      emailError = true;
    }
    if (password === '') {
      pwdError = true;
    }
    setHasError({
      name: nameError,
      email: emailError,
      password: pwdError,
    });
    if (nameError === false && emailError === false && pwdError === false) {
      onSubmit(email, password, name);
    }
  };

  const forgotPasswordHandler = () => {
    RootNavigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <View>
        <Spacer>
          <Text h3 style={styles.headerText}>
            {headerText}
          </Text>
        </Spacer>
      </View>
      <View>
        {/** Name */}
        {nameInput ? (
          <NameInput
            name={name}
            setName={setName}
            hasError={hasError.name}
            setHasError={setHasError}
          />
        ) : null}
        {/** Email */}
        <EmailInput
          email={email}
          setEmail={setEmail}
          hasError={hasError.email}
          setHasError={setHasError}
        />
        {/** Password */}
        <PasswordInput
          password={password}
          setPassword={setPassword}
          hasError={hasError.password}
          setHasError={setHasError}
        />
        {forgotPassword ? (
          <Text
            onPress={() => forgotPasswordHandler()}
            style={styles.forgetText}>
            Forgot Password?
          </Text>
        ) : null}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <Button
          title={submitButtonText}
          titleStyle={styles.buttonText}
          type="clear"
          raised={true}
          onPress={onSubmitForm}
          buttonStyle={nameInput ? styles.buttonSignup : styles.buttonLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: GREY,
    alignSelf: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 5,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  forgetText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: '4.5%',
    color: 'grey',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  buttonLogin: {
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  buttonSignup: {
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
});

export default AuthForm;
