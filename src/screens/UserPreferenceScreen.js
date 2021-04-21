import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text, Header } from 'react-native-elements';
import BranchSelectionComponent from '../components/BranchSelectionComponent';
import EducationSelectionComponent from '../components/EducationSelectionComponent';
import ExamSelectionComponent from '../components/ExamSelectionComponent';

const UserPreferenceScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        backgroundColor="white"
      />
      <Text h4>Select Your Preference</Text>
      <EducationSelectionComponent />
      <BranchSelectionComponent />
      <ExamSelectionComponent />
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
