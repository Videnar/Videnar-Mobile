import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button, Header } from 'react-native-elements';
import * as RootNavigation from '../navigation/RootNavigation';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [tittle, setTitle] = useState('Get Verification Code');
  const [show, setShow] = useState(false);
  const handler = () => {
    if (show) {
      try {
        // Auth.forgotPasswordSubmit(email, code, password)
        //   .then((data) => console.log(data))
        //   .catch((err) => console.log(err));
        // RootNavigation.navigate('Signin');
      } catch (err) {
        console.log(err);
        setShow(false);
      }
      return;
    }
    // Auth.forgotPassword(email)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    // setShow(true);
    // setTitle('Change Password');
  };
  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon name="arrow-back" onPress={() => navigation.goBack()} />
        }
        centerComponent={{ text: 'Reset Password', style: styles.headerText }}
        backgroundColor="white"
      />
      <View style={styles.container}>
        {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
        <Input
          placeholder="youremail@address.com"
          leftIcon={<Icon name="email" size={24} color="#666666" />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
        />
        {show ? (
          <>
            <Input
              secureTextEntry
              placeholder="verification code"
              leftIcon={<Icon name="vpn-key" size={24} color="#666666" />}
              value={code}
              style={styles.textInput}
              onChangeText={setCode}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              secureTextEntry
              placeholder="new password"
              leftIcon={<Icon name="lock" size={24} color="#666666" />}
              value={password}
              style={styles.textInput}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </>
        ) : null}
        <Button
          type="clear"
          raised
          title={tittle}
          onPress={handler}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </View>
    </>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  headerText: {
    color: '#A97CB0',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#F07D60',
    borderRadius: 10,
    width: 300,
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default SigninScreen;
