import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Container, Header, Item, Input, Icon } from 'native-base';
import { StyleSheet, FlatList, Text } from 'react-native';
import { searchQuestions, searchAnswers } from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const searchItems = async (val) => {
    setInput(val);
    setResults([]);
    search(searchQuestions, 'searchQuestions');
    search(searchAnswers, 'searchAnswers');
  };

  const search = async (queryFunction, queryString, callback) => {
    let res = [];
    try {
      const list = await API.graphql({
        query: queryFunction,
        variables: {
          filter: {
            content: { matchPhrasePrefix: input },
          },
        },
      });
      res = list.data[queryString].items;
      setResults([...results, ...res]);
    } catch (err) {
      console.log('error fetching items', err);
    }
  };

  const RenderItem = ({ item }) =>
    item.questionID ? (
      <AnswerComponent answer={item} />
    ) : (
      <QuestionComponent question={item} />
    );

  return (
    <Container style={styles.container}>
      <Header
        androidStatusBarColor="#fff8f5"
        iosBarStyle="dark-content"
        transparent
        searchBar
        style={styles.header}>
        <Item regular style={styles.item}>
          <Icon name="search" type="FontAwesome" style={{ color: '#8f8c8b' }} />
          <Input
            placeholder="Search..."
            placeholderTextColor="#8f8c8b"
            style={styles.input}
            onChangeText={(text) => searchItems(text)}
            value={input}
          />
        </Item>
      </Header>
      <FlatList
        data={results}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
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
    borderRadius: 7,
  },
  input: {
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default SearchScreen;
