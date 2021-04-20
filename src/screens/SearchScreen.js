import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Header, SearchBar } from 'react-native-elements';
import { View, StyleSheet, FlatList } from 'react-native';
import { searchQuestions, searchAnswers } from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';

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
      <QuestionComponent question={item} navigation={navigation} />
    );

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        style={styles.header}
        backgroundColor="white"
      />
      <SearchBar
        placeholder="Try 'How a ...'"
        lightTheme
        containerStyle={styles.Search}
        inputContainerStyle={styles.SearchInput}
        onChangeText={(text) => searchItems(text)}
        value={input}
      />
      <FlatList
        data={results}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
      />
      {/** Floating Ask Question Button */}
      <FloatingAskQuestionButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#faf4f2',
    borderColor: 'black',
    borderWidth: 10,
    borderRadius: 7,
  },
  Search: {
    backgroundColor: 'white',
    borderRadius: 40,
  },
  SearchInput: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
});

export default SearchScreen;
