import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Header } from 'react-native-elements';
import BranchSelectionComponent from '../components/BranchSelectionComponent';
import EducationSelectionComponent from '../components/EducationSelectionComponent';
import ExamSelectionComponent from '../components/ExamSelectionComponent';

const UserPreferenceScreen = () => {
  const [userPref, setUserPref] = useState({});

  // Populating UserPreference details from child components
  const updateUserPrefHandler = (userRef) => {
    const oldUserPref = userPref;
    const newUserPref = { ...oldUserPref, ...userRef };
    setUserPref(newUserPref);
  };

  const isBranchComponentVisible = () => {
    console.log(userPref.education);
    return userPref.education === 'B.Tech';
  };

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        backgroundColor="white"
      />
      <Text h4>Select Your Preference</Text>
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
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default UserPreferenceScreen;
