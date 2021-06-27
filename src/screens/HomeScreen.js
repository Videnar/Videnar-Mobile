import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Header, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';
import { useRoute } from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const route = useRoute();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuestions();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const fetchQuestions = async () => {
    try {
      const snapShot = await firestore()
        .collection('questions')
        // .where('exams', 'array-contains-any', exams)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();

      if (!snapShot.empty) {
        let newQuestions = [];
        setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

        for (let q = 0; q < snapShot.docs.length; q++) {
          newQuestions.push({
            ...snapShot.docs[q].data(),
            id: snapShot.docs[q].id,
          });
        }
        setQuestions(newQuestions);
      } else {
        setLastDocument(null);
      }
    } catch (err) {
      console.log('Error fetching questions', err);
    }
  };

  const loadMoreQuestions = async () => {
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collection('questions')
          // .where('exams', 'array-contains-any', exams)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDocument)
          .limit(6)
          .get();

        if (!snapShot.empty) {
          let newQuestions = [];
          setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

          for (let q = 0; q < snapShot.docs.length; q++) {
            newQuestions.push({
              ...snapShot.docs[q].data(),
              id: snapShot.docs[q].id,
            });
          }
          setQuestions(questions.concat(newQuestions));

          if (snapShot.docs.length < 5) {
            setLastDocument(null);
          }
        } else {
          setLastDocument(null);
        }
      }
    } catch (err) {
      console.log('Error fetching more Questions', err);
    }
  };

  const RenderItem = ({ item }) => {
    return (
      <QuestionComponent
        key={item.id}
        questionId={item.id}
        questionerUId={item.userID}
        upVotesCount={item.upvotes}
        content={item.content}
        userDisplayName={item.userDisplayName}
        route={route}
        navigation={navigation}
      />
    );
  };

  const getItemLayOut = (data, index) => ({
    length: HEIGHT * 0.25,
    offset: 5 * index,
    index,
  });

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
        style={styles.FlatList}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        onEndReachedThreshold={0.4}
        onEndReached={loadMoreQuestions}
        getItemLayout={getItemLayOut}
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
