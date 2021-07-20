import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { Button, Header } from 'react-native-elements';
import { Context } from '../contexts';
import ProfileEditableComponent from '../components/ProfileEditableComponent';
import { GREY, WHITE } from '../assets/colors/colors';
import ProfileDetails from '../components/ProfileDetails';

const ProfileScreen = ({ navigation }) => {
  const {
    changeScreen,
    removeUser,
    state: { userID, userDisplayName, preferences },
  } = useContext(Context);

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
    <View style={styles.container}>
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: WHITE,
        }}
        backgroundColor={WHITE}
      />
      <FlatList
        ListHeaderComponent={
          <>
            <ProfileDetails />
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
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
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
