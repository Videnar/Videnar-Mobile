import React from 'react';
import {Container, Header, Item, Input, Icon, Button, Text} from 'native-base';
import {StyleSheet} from 'react-native';

const SearchScreen = () => {
  return (
    <Container style={styles.container}>
      <Header
        androidStatusBarColor="#fff8f5"
        iosBarStyle="dark-content"
        transparent
        searchBar
        style={styles.header}>
        <Item regular style={styles.item}>
          <Icon name="search" type="FontAwesome" style={{color: '#8f8c8b'}} />
          <Input
            placeholder="Search..."
            placeholderTextColor="#8f8c8b"
            style={styles.input}
          />
        </Item>
      </Header>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff8f5',
  },
  item: {
    backgroundColor: '#faf4f2',
    borderColor: 'black',
    borderWidth: 10,
  },
  input: {
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default SearchScreen;
