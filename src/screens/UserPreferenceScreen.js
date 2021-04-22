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

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        backgroundColor="white"
      />
      <Text h4>Select Your Preference</Text>
      <EducationSelectionComponent
        userPref={(input) => updateUserPrefHandler(input)}
      />
      {console.log(userPref)}
      <BranchSelectionComponent
        userPref={(input) => updateUserPrefHandler(input)}
      />
      <ExamSelectionComponent
        userPref={(input) => updateUserPrefHandler(input)}
        education={userPref.education}
      />
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
