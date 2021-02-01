import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../navigation/RootNavigation';
import { Button, Input, Item, Label, Icon } from 'native-base';

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
          <Text h3 style={{ fontWeight: 'bold', fontSize: 30 }}>
            {headerText}
          </Text>
        </Spacer>
      </View>
      <View>
        {nameInput ? (
          <>
            <Item underline floatingLabel style={styles.inputStyle}>
              <Label style={styles.inputStyle}>Name</Label>
              <Input
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.textInput}
              />
              <Icon
                name="user-circle"
                type="FontAwesome"
                style={styles.iconStyle}
              />
            </Item>
            <Spacer />
          </>
        ) : null}
        <Item underline floatingLabel style={styles.inputStyle}>
          <Label style={styles.inputStyle}>Email</Label>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
          <Icon name="envelope" type="FontAwesome" style={styles.iconStyle} />
        </Item>
        <Spacer />
        <Item underline floatingLabel style={styles.inputStyle}>
          <Label style={styles.inputStyle}>Password</Label>
          <Input
            secureTextEntry
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.textInput}
          />
          <Icon name="lock" type="FontAwesome" style={styles.iconStyle} />
        </Item>
        <Spacer />
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
            block
            info
            onPress={() => onSubmit(email, password)}
            style={{ backgroundColor: '#f76f00' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
              {submitButtonText}
            </Text>
          </Button>
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
    marginTop: 15,
  },
  textInput: {
    fontSize: 15,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  forgetText: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    color: '#85898f',
  },
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconStyle: {
    color: '#85898f',
    fontSize: 22,
  },
});

export default AuthForm;
