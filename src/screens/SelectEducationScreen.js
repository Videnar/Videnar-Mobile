import React, {useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import {educations} from '../utilities/constants/education';
import * as RootNavigation from '../navigation/RootNavigation';
import {AuthContext} from '../contexts/AuthContext';

const SelectEducationScreen = () => {
  const {
    updateUserPreferences,
    state: {user},
  } = useContext(AuthContext);
  const onPressHandler = (education) => {
    if (education.level === 'B.Tech') {
      RootNavigation.navigate('SelectBranch', {education});
    } else if (!education.exams) {
      updateUserPreferences(user, {level: education.level});
      RootNavigation.navigate('Home');
    } else {
      RootNavigation.navigate('SelectExams', {education});
    }
  };

  const RenderItem = ({item}) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Text style={styles.title}>{item.level}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={educations}
        renderItem={RenderItem}
        keyExtractor={(item) => item.level}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default SelectEducationScreen;
