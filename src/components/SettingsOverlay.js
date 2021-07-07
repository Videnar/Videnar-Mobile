import React, { useContext, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Overlay, Divider, Button, Input, Icon } from 'react-native-elements';
import crashlytics from '@react-native-firebase/crashlytics';
import auth from '@react-native-firebase/auth';
import { Context } from '../contexts';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const WIDTH = Dimensions.get('window').width;

const SettingsOverlay = ({ visible, toggleVisible, navigation }) => {
  const {
    changeScreen,
    state: { email },
  } = useContext(Context);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const changePassword = () => {
    auth()
      .signInWithEmailAndPassword(email, currentPassword)
      .then(() => {
        auth()
          .currentUser.updatePassword(newPassword)
          .then(() => {
            toggleVisible();
            setNewPassword('');
            setCurrentPassword('');
          });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Password changed.',
          text2: 'Peace 😇',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.log('Error updating password:', error);
        crashlytics().log(
          'Error updating password, changePassword, settingsOverlay',
        );
        crashlytics().recordError(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Opps! Something went wrong.',
          text2: 'Please, try again 🤕',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      });
  };

  const deleteAccount = () => {
    const user = auth().currentUser;

    user
      .delete()
      .then(() => {
        changeScreen('Auth', 'Main');
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Your account has been deleted.',
          text2: 'Sorry to see you leave 😔',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1:
            'This operation is sensitive and requires recent authentication. Please, sign out and Sign in again before retrying.',
          text2: 'We will miss you 😢',
          visibilityTime: 8000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      });
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleVisible}
      overlayStyle={styles.overlay}>
      <Pressable onPress={toggleVisible} style={styles.icon}>
        <Icon type="material" name="close" size={30} />
      </Pressable>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Change Password</Text>
        <Input
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <Input
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Button
          type="solid"
          title="Change Password"
          buttonStyle={styles.button}
          onPress={changePassword}
        />
      </ScrollView>
      <Divider />
      <Text style={styles.text}>
        Danger!! If you delete your Account it can not be recovered.
      </Text>
      <Button
        type="solid"
        title="Delete My Account"
        buttonStyle={styles.dangerButton}
        onPress={deleteAccount}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 10,
    elevation: 20,
  },
  container: {
    width: WIDTH,
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 10,
    height: 30,
    width: 30,
  },
  header: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: GREY,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: DEEP_GREEN,
    borderRadius: 10,
    width: '80%',
  },
  dangerButton: {
    alignSelf: 'center',
    backgroundColor: '#ff0000',
    borderRadius: 10,
    width: '80%',
    marginVertical: '5%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SettingsOverlay;
