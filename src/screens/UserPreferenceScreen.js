import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BranchSelectionComponent from '../components/BranchSelectionComponent';
import EducationSelectionComponent from '../components/EducationSelectionComponent';
import ExamSelectionComponent from '../components/ExamSelectionComponent';
import { Context } from '../contexts';

const WIDTH = Dimensions.get('window').width;

const UserPreferenceScreen = () => {
  const { changeScreen, updateUserPreferences } = useContext(Context);
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

  const onPressHandler = () => {
    updateUserPreferences(userPref);
    const str = JSON.stringify(userPref);
    AsyncStorage.setItem('@preferences', str);
    changeScreen('Main');
  };

  return (
    <>
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'white',
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: 'purple',
        }}
        centerComponent={{
          text: 'Select Your Preference',
          style: styles.headerText,
        }}
        backgroundColor="white"
      />
      <View style={styles.container}>
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
            saveEnable={(input) => setButtonEnable(input)}
          />
        ) : (
          <></>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onPressHandler}
          type="solid"
          title="Save"
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          disabled={!buttonEnable}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 0.2,
  },
  buttonStyle: {
    backgroundColor: '#3DDC84',
    width: WIDTH * 0.7,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 25,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default UserPreferenceScreen;
