import React, {useState} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../RootNavigation';
import {
  Container,
  Content,
  Header,
  Button,
  Input,
  Item,
  Label,
} from 'native-base';

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
        <Text h3 style={{fontWeight: 'bold', fontSize: 30}}>
          {headerText}
        </Text>
      </Spacer>
      <Spacer />
      {nameInput ? (
        <>
          <Item underline floatingLabel>
            <Label>Name</Label>
            <Input
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.textInput}
            />
          </Item>
          <Spacer />
        </>
      ) : null}

      <Item underline floatingLabel>
        <Label>Email</Label>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
        />
      </Item>
      <Spacer />

      <Item underline floatingLabel>
        <Label>Password</Label>
        <Input
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
        />
      </Item>
      <Spacer />
      {forgotPassword ? (
        <Text onPress={() => forgotPasswordHandler()} style={{marginLeft: 18}}>
          Forgot Password?
        </Text>
      ) : null}
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          block
          info
          onPress={() => onSubmit(email, password)}
          style={{backgroundColor: '#03b1fc'}}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            {submitButtonText}
          </Text>
        </Button>
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
  textInput: {
    fontSize: 15,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
  },
});

export default AuthForm;
