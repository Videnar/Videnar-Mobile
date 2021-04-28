import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../navigation/RootNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Input } from 'react-native-elements';

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
              leftIcon={<Icon name="person" size={24} color="#666666" />}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </>
        ) : null}
        <Input
          placeholder="email@address.com"
          leftIcon={<Icon name="email" size={24} color="#666666" />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
        />
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<Icon name="lock" size={24} color="#666666" />}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
        />
        {forgotPassword ? (
          <Text
            onPress={() => forgotPasswordHandler()}
            style={styles.forgetText}>
            Forgot Password ?
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
    color: '#000078',
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
    backgroundColor: '#F07D60',
    borderRadius: 10,
  },
  buttonSignup: {
    backgroundColor: '#825399',
    borderRadius: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default AuthForm;
