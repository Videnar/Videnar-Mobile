import React, {useState} from 'react';
import {StyleSheet, Button, TextInput, Text, View} from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../RootNavigation';

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

  const forgotPasswordHandler = () => {
    RootNavigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      {nameInput ? (
        <>
          <Text h3>enter name</Text>
          <TextInput
            value={name}
            style={styles.textInput}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </>
      ) : null}
      <Spacer />
      <Text h3>enter email</Text>
      <TextInput
        label="Email"
        value={email}
        style={styles.textInput}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Text h3>enter password</Text>
      <TextInput
        secureTextEntry
        label="Password"
        value={password}
        style={styles.textInput}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      {forgotPassword ? (
        <Text onPress={() => forgotPasswordHandler()}>Forgot Password?</Text>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit(email, password)}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15,
  },
  textInput: {height: 40, borderColor: 'gray', borderWidth: 1},
});

export default AuthForm;
