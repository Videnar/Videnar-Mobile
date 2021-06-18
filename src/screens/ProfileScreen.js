import React, { useContext } from 'react';
import { StyleSheet, Image, ScrollView, View, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Text, Header, Button, Divider } from 'react-native-elements';
import { Context } from '../contexts';
import ProfileMoreComponent from '../components/ProfileMoreComponent';
import ProfileEditableComponent from '../components/ProfileEditableComponent';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const WIDTH = Dimensions.get('window').width;

const ProfileScreen = ({ navigation }) => {
  const {
    changeScreen,
    removeUser,
    state: { userID, userDisplayName, photoURL, preferences },
  } = useContext(Context);

  const { education, branch, exams } = preferences;

  const saveUserPreference = async () => {
    const snapShot = await firestore().collection('users').doc(userID).get();
    try {
      if (snapShot == null || !snapShot.exists) {
        await firestore()
          .collection('users')
          .doc(userID)
          .set({
            userID,
            userDisplayName,
            country: 'India',
            ...preferences,
          });
      } else {
        await firestore()
          .collection('users')
          .doc(userID)
          .update({ ...preferences });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const signOut = async () => {
    await saveUserPreference();
    try {
      await auth()
        .signOut()
        .then(() => {
          changeScreen('Auth');
          removeUser();
        })
        .catch((err) => console.log(err, 'err'));
    } catch (err) {
      console.log('er', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent"
        rightComponent={<ProfileMoreComponent />} //More Options ...
      />
      <View style={styles.profile}>
        <Image
          style={styles.picture}
          source={
            photoURL
              ? { uri: photoURL }
              : require('../assets/images/DefaultProfilePic.png')
          }
        />
        <View style={styles.details}>
          <Text style={styles.nameText}>{userDisplayName}</Text>
          <Text style={styles.educationText}>Education: {education}</Text>
          {branch && <Text h5>Branch : {branch}</Text>}
          <Text style={styles.examText}>
            Exams:{' '}
            {exams.map((exam, index) => (
              <Text key={index} style={styles.examtags}>
                {exam}
              </Text>
            ))}
          </Text>
        </View>
      </View>
      <Divider />
      {/* <Card containerStyle={styles.activityCard}>
        <View style={styles.activity}>
          <Text>5 Questions Asked</Text>
          <Text>12 Questions Answered</Text>
        </View>
      </Card> */}
      <ProfileEditableComponent navigation={navigation} />
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
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'grey',
  },
  details: {
    justifyContent: 'space-around',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    color: GREY,
  },
  educationText: {
    fontSize: 16,
    letterSpacing: 1,
    color: GREY,
  },
  examText: {
    fontSize: 16,
    letterSpacing: 1,
    color: GREY,
  },
  examtags: {
    color: DEEP_GREEN,
    letterSpacing: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  // activityCard: {
  //   flex: 1,
  //   borderRadius: 10,
  //   elevation: 2,
  // },
  // activity: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   padding: 10,
  // },
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
