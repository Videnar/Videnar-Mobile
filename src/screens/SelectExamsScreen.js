import React, {useContext, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
  Button,
} from 'react-native';
import {Context as AuthContext} from '../contexts/AuthContext';

const SelectExamsScreen = ({route, navigation}) => {
  const {updateUserPreferences} = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const {education, branch} = route.params;
  const finishSignUp = (item) => {
    updateUserPreferences({
      level: education.level,
      branch: branch,
      exams: exams,
    });
    navigation.navigate('Home');
  };

  const onPressHandler = (item) => {
    const dataArray = [...exams];
    const index = dataArray.indexOf(item);
    if (index > -1) {
      dataArray.splice(index, 1);
    } else {
      dataArray.push(item);
    }
    setExams([...dataArray]);
  };

  const RenderItem = ({item}) => (
    <TouchableOpacity onPress={() => onPressHandler(item)}>
      <View
        style={
          [...exams].includes(item)
            ? {
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#f9c2ff',
              }
            : {
                padding: 10,
                borderRadius: 5,
                backgroundColor: '#a1a1a1',
              }
        }>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={education.exams}
        renderItem={RenderItem}
        keyExtractor={(item) => item}
      />
      <Button title="Finish Signing Up" onPress={finishSignUp} />
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

export default SelectExamsScreen;
