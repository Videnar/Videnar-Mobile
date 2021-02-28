import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { educations } from '../utilities/constants/education';
import { AuthContext } from '../contexts/AuthContext';
import {
  Body,
  Content,
  Header,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Title,
} from 'native-base';

const SelectEducationScreen = ({ navigation }) => {
  const {
    updateUserPreferences,
    state: { user },
  } = useContext(AuthContext);
  const onPressHandler = (education) => {
    if (education.level === 'B.Tech') {
      navigation.navigate('SelectBranch', { education });
    } else if (!education.exams) {
      updateUserPreferences(user, { level: education.level });
      navigation.navigate('Home');
    } else {
      navigation.navigate('SelectExams', { education });
    }
  };

  const RenderItem = educations.map((item) => (
    <ListItem onPress={() => onPressHandler(item)} key={item.level}>
      <Left>
        <Text style={styles.title}>{item.level}</Text>
      </Left>
      <Right>
        <Icon name="arrow-circle-right" type="FontAwesome" />
      </Right>
    </ListItem>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Header
        androidStatusBarColor="#fff8f5"
        iosBarStyle="dark-content"
        style={styles.header}>
        <Left />
        <Body style={{ flex: 3 }}>
          <Title style={{ fontWeight: 'bold' }}>Select Your Education</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>{RenderItem}</List>
      </Content>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f5',
    // marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#f76f00',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 15,
    marginLeft: 25,
  },
});

export default SelectEducationScreen;
