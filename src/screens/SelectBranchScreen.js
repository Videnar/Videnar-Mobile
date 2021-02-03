import {
  Body,
  Content,
  Header,
  Left,
  Right,
  Title,
  List,
  ListItem,
  Icon,
} from 'native-base';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation';

const SelectBranchScreen = ({ route }) => {
  const { education } = route.params;
  const onPressHandler = (branch) => {
    RootNavigation.navigate('SelectExams', { education, branch });
  };
  const RenderItem = education.branches.map((item) => (
    <ListItem onPress={() => onPressHandler(item)} key={item.branches}>
      <Left>
        <Text style={styles.title}>{item}</Text>
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
          <Title style={{ fontWeight: 'bold' }}>Select your Branch</Title>
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

export default SelectBranchScreen;
