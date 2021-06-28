import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import AnswerComponent from '../components/AnswerComponent';
import { WHITE } from '../assets/colors/colors';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userID },
  } = useContext(Context);
  const [answers, setAnswers] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers, answers]);

  const fetchAnswers = useCallback(async () => {
    try {
      const snapShot = await firestore()
        .collectionGroup('answers')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();

      if (!snapShot.empty) {
        let newAnswers = [];
        setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

        for (let q = 0; q < snapShot.docs.length; q++) {
          newAnswers.push({
            ...snapShot.docs[q].data(),
            id: snapShot.docs[q].id,
          });
        }

        setAnswers(newAnswers);
      } else {
        setLastDocument(null);
      }
    } catch (err) {
      console.log('error fetching answers', err);
    }
  }, [userID]);

  const loadMoreAnswers = async () => {
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collectionGroup('answers')
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDocument)
          .limit(16)
          .get();

        if (!snapShot.empty) {
          let newAnswers = [];
          setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

          for (let q = 0; q < snapShot.docs.length; q++) {
            newAnswers.push({
              ...snapShot.docs[q].data(),
              id: snapShot.docs[q].id,
            });
          }

          setAnswers(newAnswers);
        } else {
          setLastDocument(null);
        }
      }
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  const RenderItem = ({ item }) => {
    return <AnswerComponent answer={item} questionId={item.questionID} />;
  };

  const lastItem = (
    <View style={styles.lastItem}>
      <Text>You have reached the end.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <FlatList
        data={answers}
        renderItem={RenderItem}
        ListFooterComponent={lastItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        updateCellsBatchingPeriod={100}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreAnswers}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  lastItem: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default React.memo(ActivityScreen);
