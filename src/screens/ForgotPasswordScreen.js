import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <Text h3>enter your email</Text>
      <TextInput
        label="Email"
        value={email}
        style={styles.textInput}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {show ? (
        <>
          <Text h3>enter verification code</Text>
          <TextInput
            secureTextEntry
            value={code}
            style={styles.textInput}
            onChangeText={setCode}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text h3>enter new password</Text>
          <TextInput
            secureTextEntry
            label="Password"
            value={password}
            style={styles.textInput}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </>
      ) : null}
      <Button title={tittle} onPress={handler} />
    </View>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    paddingTop: 10,
  },
  textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
});

export default SigninScreen;
