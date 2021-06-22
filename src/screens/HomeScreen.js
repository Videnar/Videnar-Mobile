import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Header, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';

const HomeScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const {
    state: {
      preferences: { branch, exams },
    },
  } = useContext(Context);

  useEffect(() => {
    const fetchQuestions = firestore()
      .collection('questions')
      // .where('exams', 'array-contains-any', exams)
      .orderBy('createdAt', 'desc')
      .limit(16)
      .onSnapshot((querySnapshot) => {
        const q = [];
        if (querySnapshot !== null) {
          querySnapshot.forEach((documentSnapshot) => {
            q.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          setQuestions(q);
          setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
        }
      });
    return () => {
      fetchQuestions();
    };
  }, [branch, exams]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshQuestions();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshQuestions]);

  const refreshQuestions = useCallback(async () => {
    try {
      firestore()
        .collection('questions')
        // .where('exams', 'array-contains-any', exams)
        .orderBy('createdAt', 'desc')
        .limit(16)
        .onSnapshot((querySnapshot) => {
          const q = [];
          if (querySnapshot !== null) {
            querySnapshot.forEach((documentSnapshot) => {
              q.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setQuestions([...q]);
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          }
        });
    } catch (err) {
      console.log('error fetching questions', err);
    }
  }, []);

  const loadMoreQuestions = async () => {
    try {
      firestore()
        .collection('questions')
        // .where('exams', 'array-contains-any', exams)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocument)
        .limit(16)
        .onSnapshot((querySnapshot) => {
          const q = [];
          if (querySnapshot !== null) {
            querySnapshot.forEach((documentSnapshot) => {
              q.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setQuestions([...questions, ...q]);
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          }
        });
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  const RenderItem = ({ item }) => (
    <QuestionComponent question={item} navigation={navigation} />
  );

  const lastItem = (
    <View style={styles.lastItem}>
      <Text>No More Questions to Show</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        placement="left"
        centerComponent={{
          text: 'Videnar',
          style: {
            color: DEEP_GREEN,
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1.5,
          },
        }}
        backgroundColor="white"
      />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={questions}
        renderItem={RenderItem}
        ListFooterComponent={lastItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
        maxToRenderPerBatch={8}
        initialNumToRender={8}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreQuestions}
      />
      {/* FAB */}
      <FloatingAskQuestionButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: { marginHorizontal: 2 },
  container: { flex: 1, backgroundColor: WHITE },
  lastItem: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default HomeScreen;
