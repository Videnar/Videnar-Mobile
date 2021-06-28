import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { Overlay, Button, Input, Icon, Text } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { Context } from '../contexts';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const WIDTH = Dimensions.get('window').width;

const SettingsOverlay = ({ visible, toggleVisible, navigation }) => {
  const {
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
          topOffset: 30,
          bottomOffset: 40,
        });
      })
      .catch((error) => {
        console.log('Error updating password:', error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Opps! Something went wrong.',
          text2: 'Please, try again 🤕',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 30,
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
      {/* <Text>More Features Coming Soon...</Text> */}
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
});

export default SettingsOverlay;
