import React, { useContext } from 'react';
import { StyleSheet, Image, ScrollView, View, StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { Text, Button } from 'react-native-elements';
import { Context } from '../contexts';
import ProfileEditableComponent from '../components/ProfileEditableComponent';
import { DEEP_GREEN, GREY, WHITE } from '../assets/colors/colors';
import Spacer from '../components/Spacer';

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
      crashlytics().log(
        'error in saveUserPreference, saveUserPreference, ProfileScreen',
      );
      crashlytics().recordError(err);
    }
  };

  const listExams = exams.map((exam, index) => {
    if (exam.match('GATE')) {
      exam = 'GATE';
    }
    if (exam.match('IES')) {
      exam = 'IES';
    }
    return (
      <Text key={index} style={styles.examtags}>
        {index === exams.length - 1 ? exam : exam + ', '}
      </Text>
    );
  });

  const signOut = async () => {
    await saveUserPreference();
    await auth()
      .signOut()
      .then(() => {
        changeScreen('Auth', 'Main');
        removeUser();
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Your have signed out.',
          text2: 'See Ya 👋',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      })
      .catch((err) => {
        console.log(err, 'err');
        crashlytics().log('error signing out, signout, ProfileScreen');
        crashlytics().recordError(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
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
          <Text style={styles.educationText}>
            Education: {<Text style={styles.userData}>{education}</Text>}
          </Text>
          {branch && (
            <Text style={styles.educationText}>
              Branch: {<Text style={styles.userData}>{branch}</Text>}
            </Text>
          )}
          <Text style={styles.examText}>Exams: {listExams}</Text>
        </View>
      </View>
      <Spacer />
      <ProfileEditableComponent navigation={navigation} />
      {/* SignOut Button */}
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
    alignItems: 'center',
    marginTop: '5%',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  details: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '60%',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    color: GREY,
  },
  userData: {
    fontWeight: 'bold',
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
  signOutButton: {
    marginTop: 10,
    width: '50%',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
  },
  signOutText: {
    color: GREY,
    letterSpacing: 0.5,
  },
});

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
