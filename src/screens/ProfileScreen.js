import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Image,
  Button,
  Text,
  TextInput,
  ScrollView,
  StatusBar
} from 'react-native';
import Spacer from '../components/Spacer';
import { AuthContext } from '../contexts/AuthContext';

const ProfileScreen = () => {
  const {
    signOut,
    changePassword,
    state: {
      attributes: { name, picture },
      preferences: { level, branch, exams },
    },
  } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const pictureURL = picture || JSON.parse(picture).data.url;

  const onChangePasswordHandler = () => {
    if (show == true) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  return (
    <ScrollView style={styles.container} >
      <StatusBar backgroundColor='#fff8f5' barStyle='dark-content' />
      <Spacer />
      <Image
        style={styles.picture}
        source={
          pictureURL
            ? { uri: pictureURL }
            : require('../assets/images/DefaultProfilePic.png')
        }
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>Education: {level}</Text>
      {branch && <Text style={styles.title}>Branch : {branch}</Text>}
      <Text style={styles.title}>Exams:</Text>
      {exams.map((exam, index) => (
        <Text style={styles.title}>{exam}</Text>
      ))}
      <Text style={styles.button} onPress={onChangePasswordHandler}>
        Change Password
      </Text>
      {show ? (
        <>
          <Text h3>Enter Old Password</Text>
          <TextInput
            secureTextEntry
            value={oldPassword}
            style={styles.textInput}
            onChangeText={setOldPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text h3>Enter New Password</Text>
          <TextInput
            secureTextEntry
            value={newPassword}
            style={styles.textInput}
            onChangeText={setNewPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Button
            onPress={() => changePassword(oldPassword, newPassword)}
            title="Change Password"
          />
        </>
      ) : null}
      <Button onPress={() => signOut()} title="Sign Out" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f5'
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '600',
    padding: 5,
  },
  button: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#85898f',
    alignSelf: 'center'
  }
});

function propsAreEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
