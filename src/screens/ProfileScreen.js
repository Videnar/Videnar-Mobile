import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Image,
  Button,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

const ProfileScreen = () => {
  const {
    signOut,
    changePassword,
    state: {
      attributes: {name, picture},
      preferences: {level, branch, exams},
    },
  } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const pictureURL = picture || JSON.parse(picture).data.url;

  return (
    <ScrollView>
      <Image
        style={styles.picture}
        source={
          pictureURL
            ? {uri: pictureURL}
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
      <Text style={styles.title} onPress={() => setShow(true)}>
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
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    padding: 5,
  },
});

function propsAreEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
