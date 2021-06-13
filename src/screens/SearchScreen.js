import React, { useState } from 'react';
import { Button, Header, SearchBar } from 'react-native-elements';
import WebView from 'react-native-webview';
import { View, Pressable, StyleSheet, FlatList } from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';

const client = algoliasearch('57GDG0G124', 'fbf39f1bd5993e5e0c8fec4f3ba85e9a');
const index = client.initIndex('questions');

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    try {
      index.search(input).then(({ hits }) => {
        setResults(hits);
      });
    } catch (err) {
      console.log('error fetching items', err);
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('QuestionDetails', {
            questionID: item.objectID,
          });
        }}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `<head>
                   <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                 </head>
                 <body >
                   <div>${item._highlightResult.content.value}</div>
                 </body>`,
          }}
          style={styles.WebView}
        />
      </Pressable>
    );
  };

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
        onChangeText={(text) => setInput(text)}
        onClear={() => setResults([])}
        value={input}
      />
      <Button title="Search" onPress={search} />
      <FlatList
        data={results}
        renderItem={RenderItem}
        keyExtractor={(item) => item.objectID}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        updateCellsBatchingPeriod={100}
      />
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
  WebView: {
    width: 'auto',
    height: 50,
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
