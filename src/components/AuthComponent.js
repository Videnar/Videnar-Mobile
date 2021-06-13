import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Input } from 'react-native-elements';
import { DEEP_GREEN, LIGHT_GREEN, YELLOW } from '../assets/colors/colors';

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

  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

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
        {nameInput ? (
          <>
            <Input
              placeholder="your name"
              leftIcon={<Icon name="person" size={24} color="#5A5A5A" />}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
              inputContainerStyle={
                nameFocus ? styles.focused : styles.notFocused
              }
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </>
        ) : null}
        <Input
          placeholder="email@address.com"
          leftIcon={<Icon name="email" size={24} color="#5A5A5A" />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={emailFocus ? styles.focused : styles.notFocused}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<Icon name="lock" size={24} color="#5A5A5A" />}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={pwdFocus ? styles.focused : styles.notFocused}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
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
        <Spacer>
          <Button
            title={submitButtonText}
            titleStyle={styles.buttonText}
            type="clear"
            raised={true}
            onPress={() => onSubmit(email, password, name)}
            buttonStyle={nameInput ? styles.buttonSignup : styles.buttonLogin}
          />
        </Spacer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: YELLOW,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 5,
  },
  textInput: {
    fontSize: 15,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
  forgetText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingRight: 15,
    color: 'grey',
    letterSpacing: 0.5,
  },
  inputStyle: {
    paddingLeft: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
  buttonLogin: {
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
  },
  buttonSignup: {
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
  },
  notFocused: {
    borderColor: 'grey',
  },
  focused: {
    borderColor: LIGHT_GREEN,
  },
});

export default AuthForm;
