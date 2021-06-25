import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import { Text } from 'react-native-elements';
import QuestionComponent from '../components/QuestionComponent';
import { WHITE } from '../assets/colors/colors';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  useEffect(() => {
    const fetchQuestions = firestore()
      .collection('questions')
      .where('userID', '==', userID)
      .orderBy('createdAt', 'desc')
      .limit(5)
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
      try {
        fetchQuestions();
      } catch (err) {
        console.log('Error fetchQuestion in ActivityScreen useEffect');
      }
    };
  }, [questions, userDisplayName, userID]);

  const loadMoreQuestions = async () => {
    try {
      await firestore()
        .collection('questions')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .startAfter(lastDocument)
        .limit(5)
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
      console.log('Error fetching questions loadMore in QuestionActivity', err);
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
      <FlatList
        data={questions}
        renderItem={RenderItem}
        ListFooterComponent={lastItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
        maxToRenderPerBatch={4}
        initialNumToRender={8}
        updateCellsBatchingPeriod={100}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreQuestions}
      />
    </View>
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
