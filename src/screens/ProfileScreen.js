import React, {useContext, useState} from 'react';
import {StyleSheet, Image, Button, Text, TextInput, View} from 'react-native';
import {Context as AuthContext} from '../contexts/AuthContext';

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
    <View>
      <Image
        style={styles.picture}
        source={
          pictureURL
            ? {uri: pictureURL}
            : require('../assets/images/DefaultProfilePic.png')
        }
      />
      <Text style={styles.title}>Name: {name}</Text>
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
          <Text h3>enter Old Password</Text>
          <TextInput
            secureTextEntry
            value={oldPassword}
            style={styles.textInput}
            onChangeText={setOldPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text h3>enter new password</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  picture: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    padding: 5,
  },
});

export default ProfileScreen;
