import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Container, Header, Item, Input, Icon } from 'native-base';
import { StyleSheet, FlatList, Text } from 'react-native';
import {
  searchQuestions,
  searchAnswers,
  searchCommentOnQuestions,
  searchCommentOnAnswers,
} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
// import {useDebouncedEffect} from '../utilities/useDebouncedEffect';

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [Questions, setQuestions] = useState([]);
  const [Answers, setAnsers] = useState([]);
  const [CommentOnQuestions, setCommentOnQuestions] = useState([]);
  const [CommentOnAnswers, setCommentOnAnswers] = useState();

  const searchItems = async (val) => {
    setInput(val);
    search(searchQuestions, 'searchQuestions', setQuestions);
    // search(searchAnswers, 'searchAnswers', setAnsers);
    // search(
    //   searchCommentOnQuestions,
    //   'searchCommentOnQuestions',
    //   setCommentOnQuestions,
    // );
    // search(
    //   searchCommentOnAnswers,
    //   'searchCommentOnAnswers',
    //   setCommentOnAnswers,
    // );
  };

  const search = async (queryFunction, queryString, callback) => {
    try {
      const list = await API.graphql({
        query: queryFunction,
        variables: {
          filter: {
            content: { matchPhrasePrefix: input },
          },
        },
      });
      const result = list.data[queryString].items;
      callback(result);
    } catch (err) {
      console.log('error fetching commentsOnAnswer', err);
    }
  };

  const RenderItem = ({ item }) => <QuestionComponent question={item} />;

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
        data={Questions}
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
