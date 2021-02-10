import {
  Body,
  Header,
  Left,
  ListItem,
  Right,
  Title,
  Button,
} from 'native-base';
import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList } from 'react-native';
import Spacer from '../components/Spacer';
import { AuthContext } from '../contexts/AuthContext';

const SelectExamsScreen = ({ route, navigation }) => {
  const { updateUserPreferences } = useContext(AuthContext);
  const [exams, setExams] = useState([]);
  const { education, branch } = route.params;
  const finishSignUp = (item) => {
    updateUserPreferences({
      level: education.level,
      branch: branch,
      exams: exams,
    });
    navigation.navigate('Main');
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

  const RenderItem = ({ item }) => (
    <ListItem
      onPress={() => onPressHandler(item)}
      style={
        [...exams].includes(item) ? styles.itemSelected : styles.itemNotSelected
      }>
      <Text style={styles.textItem}>{item}</Text>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        androidStatusBarColor="#fff8f5"
        iosBarStyle="dark-content"
        style={styles.header}>
        <Left />
        <Body style={{ flex: 3 }}>
          <Title style={{ fontWeight: 'bold' }}>Exams</Title>
        </Body>
        <Right />
      </Header>
      <Spacer />
      <FlatList
        data={education.exams}
        renderItem={RenderItem}
        keyExtractor={(item) => item}
      />
      <Button full success onPress={finishSignUp}>
        <Text style={styles.textItem}>Finish Signing Up</Text>
      </Button>
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
  header: {
    backgroundColor: '#f76f00',
  },
  itemSelected: {
    padding: 10,
    borderRadius: 100,
    margin: 7,
    backgroundColor: '#de5f57',
  },
  itemNotSelected: {
    padding: 10,
    borderRadius: 100,
    margin: 7,
    backgroundColor: '#c7a32c',
  },
  textItem: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SelectExamsScreen;
