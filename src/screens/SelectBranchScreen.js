import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import * as RootNavigation from '../RootNavigation';

const SelectBranchScreen = ({route}) => {
  console.log();
  const {education} = route.params;
  const onPressHandler = (branch) => {
    RootNavigation.navigate('SelectExams', {education, branch});
  };
  const RenderItem = ({item}) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={education.branches}
        renderItem={RenderItem}
        keyExtractor={(item) => item}
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

export default SelectBranchScreen;
