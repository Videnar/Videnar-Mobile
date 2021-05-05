import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { Input, Icon, Button, Header } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const handler = () => {
    const message = 'Check your email to reset Password.';
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        if (Platform.OS === 'android') {
          ToastAndroid.show(message, ToastAndroid.LONG);
        } else {
          AlertIOS.alert(message);
        }
        navigation.goBack();
      })
      .catch(function (error) {
        // An error happened.
      });
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
        <Button
          type="clear"
          raised
          title="Continue"
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
