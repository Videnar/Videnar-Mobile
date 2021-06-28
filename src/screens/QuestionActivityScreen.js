import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-elements';
import QuestionComponent from '../components/QuestionComponent';
import { WHITE } from '../assets/colors/colors';
import { useRoute } from '@react-navigation/native';
import { Context } from '../contexts';

const HEIGHT = Dimensions.get('window').height;

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const [questions, setQuestions] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const route = useRoute();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions, questions]);

  const fetchQuestions = useCallback(async () => {
    try {
      const snapShot = await firestore()
        .collection('questions')
        .where('userID', '==', userID)
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
  }, [userID]);

  const loadMoreQuestions = async () => {
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collection('questions')
          .where('userID', '==', userID)
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

  const RenderItem = ({ item }) => (
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

  const lastItem = (
    <View style={styles.lastItem}>
      <Text>No More Questions to Show</Text>
    </View>
  );

  const getItemLayOut = (data, index) => ({
    length: HEIGHT * 0.25,
    offset: 5 * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <FlatList
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  FlatList: { marginHorizontal: 2 },
  lastItem: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default React.memo(ActivityScreen);
