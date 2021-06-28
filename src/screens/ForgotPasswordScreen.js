import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Icon, Button, Header, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import Logo from '../utilities/Icons/Logo';
import Spacer from '../components/Spacer';
import EmailInput from '../components/InputComponents/EmailInput';

const SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState({ email: false });

  const onSubmitHandler = () => {
    const emailFormat =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailFormat)) {
      setHasError({ email: true });
    } else {
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
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Icon
          type="material"
          name="arrow-back"
          containerStyle={styles.iconContainer}
          onPress={() => navigation.goBack()}
          size={30}
        />
      </View>
      <ScrollView>
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
          <EmailInput
            email={email}
            setEmail={setEmail}
            hasError={hasError.email}
            setHasError={setHasError}
          />
          <Button
            type="clear"
            raised
            title="Continue"
            onPress={onSubmitHandler}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />
        </View>
        <Spacer />
        <Spacer />
      </ScrollView>
    </SafeAreaView>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
  },
  headerContainer: {
    height: '7%',
  },
  iconContainer: {
    height: 30,
    width: 30,
    marginVertical: 5,
    marginHorizontal: 10,
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
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: GREY,
    alignSelf: 'center',
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
