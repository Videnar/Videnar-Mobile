import React, { useContext, useState } from 'react';
import { StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import Spacer from '../components/Spacer';
import { AuthContext } from '../contexts/AuthContext';
import { Button, Text, Input, Label, Item, Icon } from 'native-base';
import Share from 'react-native-share';

const ProfileScreen = ({ navigation }) => {
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
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const shareAppHandler = () => {
    const options = {
      message:
        'Hey There! Join Vedenar and start your career journey without any distraction',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#fff8f5" barStyle="dark-content" />
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
        <Text key={index} style={styles.title}>
          {exam}
        </Text>
      ))}
      <Text style={styles.button} onPress={onChangePasswordHandler}>
        Change Password
      </Text>
      {show ? (
        <>
          <Item underline floatingLabel style={styles.textInput}>
            <Label style={styles.labelInput}>Enter Old Password</Label>
            <Input
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Spacer />
          <Item underline floatingLabel style={styles.textInput}>
            <Label style={styles.labelInput}>Enter New Password</Label>
            <Input
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Item>
          <Spacer />
          <Button
            block
            info
            style={styles.blockButton}
            onPress={() => changePassword(oldPassword, newPassword)}>
            <Text style={{ fontSize: 15, color: 'white' }}>
              Change Password
            </Text>
          </Button>
        </>
      ) : null}
      <Spacer />
      <Spacer />
      <Button block info style={styles.blockButton} onPress={signOut}>
        <Text style={{ fontSize: 15, color: 'white' }}>Sign Out</Text>
      </Button>
      <Spacer />
      <Button transparent danger full onPress={shareAppHandler}>
        <Icon
          name="share-square"
          type="FontAwesome"
          style={{ color: 'white' }}
        />
        <Text>Share</Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f5',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
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
    alignSelf: 'center',
  },
  blockButton: {
    backgroundColor: '#f76f00',
    marginHorizontal: 100,
  },
  textInput: {
    marginHorizontal: 20,
    paddingLeft: 20,
    alignSelf: 'center',
  },
  labelInput: {
    marginHorizontal: 10,
    fontSize: 13,
  },
});

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
