import React, { useContext, useState } from 'react';
import { StyleSheet, Image, ScrollView, View, Dimensions } from 'react-native';
import { Text, Card, Header, Icon, Button } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import Share from 'react-native-share';

const WIDTH = Dimensions.get('window').width;

const ProfileScreen = ({ navigation }) => {
  const {
    signOut,
    changePassword,
    changeScreen,
    state: {
      attributes: { name, picture },
      preferences: { level, branch, exams },
    },
  } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const pictureURL = picture && (picture || JSON.parse(picture).data.url);

  const onChangePasswordHandler = () => {
    if (show === true) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const onEditExamPreferences = () => {
    changeScreen('UserInfo');
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
      {/* <Image
        source={require('../assets/images/coverImage.png')}
        style={styles.cover}
      /> */}
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent"
        rightComponent={{ icon: 'more-vert' }}
      />
      <View style={styles.profile}>
        <Image
          style={styles.picture}
          source={
            pictureURL
              ? { uri: pictureURL }
              : require('../assets/images/DefaultProfilePic.png')
          }
        />
        <View style={styles.details}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.educationText}>Education: {level}</Text>
          {branch && <Text h5>Branch : {branch}</Text>}
          <Text style={styles.educationText}>Exams:</Text>
          {exams.map((exam, index) => (
            <Text key={index} style={styles.examtags}>
              {exam}
            </Text>
          ))}
        </View>
      </View>
      <Card.Divider />
      <Card containerStyle={styles.activityCard}>
        <View style={styles.activity}>
          <Text>5 Questions Asked</Text>
          <Text>12 Questions Answered</Text>
        </View>
      </Card>
      <Card containerStyle={styles.optionsCard}>
        <View>
          <View style={styles.cardItem}>
            <Icon name="book" type="material" color="grey" />
            <Text style={styles.cardItemText}>Saved</Text>
          </View>
          <Card.Divider />
          <View style={styles.cardItem}>
            <Icon name="edit" type="material" color="grey" />
            <Text style={styles.cardItemText}>Edit Exam Preference</Text>
          </View>
          <Card.Divider />
          <View style={styles.cardItem}>
            <Icon name="notifications" type="material" color="grey" />
            <Text style={styles.cardItemText}>Notification</Text>
          </View>
          <Card.Divider />
          <View style={styles.cardItem}>
            <Icon name="settings" type="material" color="grey" />
            <Text style={styles.cardItemText}>Setting</Text>
          </View>
        </View>
      </Card>
      <Button
        type="solid"
        raised
        title="Sign Out"
        onPress={signOut}
        buttonStyle={styles.signOutButton}
      />
      {/* <Image
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
      <Button
        transparent
        style={styles.editButton}
        onPress={onEditExamPreferences}>
        <Text style={styles.editText}>Edit</Text>
        <Icon name="edit" type="FontAwesome" />
      </Button>
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
      </Button> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginLeft: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
  },
  details: {
    paddingLeft: 40,
    paddingTop: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    color: '#474949',
  },
  educationText: {
    fontSize: 16,
    letterSpacing: 1.6,
    color: 'black',
  },
  examtags: {
    color: 'red',
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  activityCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 2,
  },
  optionsCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 1,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemText: {
    marginLeft: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
    color: 'grey',
  },
  signOutButton: {
    marginTop: 10,
    width: WIDTH * 0.5,
    alignItems: 'center',
    left: WIDTH * 0.25,
    backgroundColor: '#E03F3F',
    borderRadius: 8,
  },
});

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
