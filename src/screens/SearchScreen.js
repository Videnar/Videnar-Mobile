import React, { useState } from 'react';
import { Button, SearchBar } from 'react-native-elements';
import WebView from 'react-native-webview';
import {
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  StatusBar,
} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';
import Algolia from '../utilities/Icons/Algolia';

const client = algoliasearch('57GDG0G124', 'fbf39f1bd5993e5e0c8fec4f3ba85e9a');
const index = client.initIndex('questions');

const SearchScreen = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const search = () => {
    try {
      if (input.trim() !== '') {
        index.search(input.trim()).then(({ hits }) => {
          setResults(hits);
        });
      }
    } catch (err) {
      console.log('error fetching items', err);
    }
  };

  const onChangeTextHandler = (text) => {
    setInput(text);
    if (text.trim() === '') {
      setResults([]);
      setDisabled(true);
    } else {
      setDisabled((prevState) => {
        if (prevState === true) {
          return false;
        }
      });
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
          scrollEnabled={false}
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search here ..."
          platform="android"
          containerStyle={styles.search}
          inputContainerStyle={styles.searchInput}
          onChangeText={(text) => onChangeTextHandler(text)}
          onClear={() => setResults([])}
          value={input}
          searchIcon={false}
          returnKeyType="search"
          onSubmitEditing={search}
        />
        <Button
          type="clear"
          icon={{
            type: 'material',
            name: 'search',
            size: 32,
            color: disabled ? 'grey' : DEEP_GREEN,
          }}
          onPress={search}
          buttonStyle={styles.buttonStyle}
          disabled={disabled}
        />
      </View>
      <View style={styles.algoliaContainer}>
        <Algolia />
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={results}
          renderItem={RenderItem}
          keyExtractor={(item) => item.objectID}
          maxToRenderPerBatch={4}
          initialNumToRender={3}
          updateCellsBatchingPeriod={100}
        />
      </View>
      <FloatingAskQuestionButton navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: '04%',
  },
  search: {
    backgroundColor: 'white',
    height: 65,
    width: '80%',
  },
  searchInput: {
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
  buttonStyle: {
    width: 60,
    height: 60,
  },
  algoliaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '23%',
  },
  resultsContainer: {
    marginHorizontal: '03%',
  },
  WebView: {
    width: 'auto',
    height: 50,
  },
});

export default SearchScreen;
