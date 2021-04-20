import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Text,
  Card,
  Header,
  Icon,
  Button,
  Overlay,
} from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import Share from 'react-native-share';
import ProfileMoreComponent from '../components/ProfileMoreComponent';
import ProfileEditableComponent from '../components/ProfileEditableComponent';

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
  // More Button
  const [moreVisible, setMoreVisible] = useState(false);
  const toggleOverlay = () => {
    setMoreVisible(!moreVisible);
  };

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
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent"
        rightComponent={<ProfileMoreComponent />}
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
      <ProfileEditableComponent />
      <Button
        type="clear"
        raised
        title="Sign Out"
        onPress={signOut}
        titleStyle={styles.signOutText}
        buttonStyle={styles.signOutButton}
      />
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
  signOutButton: {
    marginTop: 10,
    width: WIDTH * 0.5,
    alignItems: 'center',
    left: WIDTH * 0.25,
    borderRadius: 8,
  },
  signOutText: {
    color: 'grey',
  },
});

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
