import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { Input, Icon, Button, Header, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import Spacer from '../components/Spacer';

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
