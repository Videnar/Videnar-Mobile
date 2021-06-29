import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, BackHandler, ScrollView } from 'react-native';
import { Header, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import BranchSelectionComponent from '../components/BranchSelectionComponent';
import EducationSelectionComponent from '../components/EducationSelectionComponent';
import ExamSelectionComponent from '../components/ExamSelectionComponent';
import { Context } from '../contexts';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const UserPreferenceScreen = () => {
  const {
    changeScreen,
    updateUserPreferences,
    state: { previousScreen },
  } = useContext(Context);
  const [userPref, setUserPref] = useState({});
  const [buttonEnable, setButtonEnable] = useState(false);

  // Populating UserPreference details from child components
  const updateUserPrefHandler = (pref) => {
    const oldUserPref = userPref;
    const newUserPref = { ...oldUserPref, ...pref };
    setUserPref(newUserPref);
  };

  const isBranchComponentVisible = () => {
    return userPref.education === 'B.Tech';
  };

  const onPressHandler = async () => {
    updateUserPreferences(userPref);
    const str = JSON.stringify(userPref);
    await AsyncStorage.setItem('@preferences', str);
    changeScreen('Main', 'UserPref');
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Your info are saved',
      text2: 'Awesome ✌️',
      visibilityTime: 1000,
      autoHide: true,
      topOffset: 40,
      bottomOffset: 40,
    });
  };

  useEffect(() => {
    const backAction = () => {
      changeScreen(previousScreen, 'UserPref');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [changeScreen, previousScreen]);

  return (
    <>
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'white',
        }}
        leftComponent={{
          icon: 'arrow-back',
          onPress: () => changeScreen(previousScreen, 'UserPref'),
          color: GREY,
          size: 30,
        }}
        centerComponent={{
          text: 'Select Preferences',
          style: styles.headerText,
        }}
        backgroundColor="white"
      />
      <ScrollView style={styles.container}>
        {/** Education level Selection */}
        <EducationSelectionComponent
          userPref={(input) => updateUserPrefHandler(input)}
        />
        {/** Branch Selection conditional rendering based on B.Tech lavel */}
        {isBranchComponentVisible() ? (
          <BranchSelectionComponent
            userPref={(input) => updateUserPrefHandler(input)}
          />
        ) : (
          <></>
        )}
        {/** Exam Selection Based on selected level */}
        {userPref.education ? (
          <ExamSelectionComponent
            userPref={(input) => updateUserPrefHandler(input)}
            education={userPref.education}
            branch={userPref.branch}
            saveEnable={(input) => setButtonEnable(input)}
          />
        ) : (
          <></>
        )}
        <Button
          onPress={onPressHandler}
          type="solid"
          title="Save"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          disabled={!buttonEnable}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    letterSpacing: 1,
  },
  buttonStyle: {
    backgroundColor: DEEP_GREEN,
    width: '80%',
    height: 40,
    marginVertical: 70,
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default UserPreferenceScreen;
