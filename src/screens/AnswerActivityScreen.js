import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import AnswerComponent from '../components/AnswerComponent';
import { WHITE } from '../assets/colors/colors';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [answers, setAnswers] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        firestore()
          .collectionGroup('answers')
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
          .limit(16)
          .onSnapshot((querySnapshot) => {
            const ans = [];
            querySnapshot &&
              querySnapshot.forEach((documentSnapshot) => {
                ans.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              });
            setAnswers(ans);
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          });
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    fetchAnswers();
  }, [userDisplayName, userID]);

  const loadMoreAnswers = async () => {
    try {
      firestore()
        .collectionGroup('answers')
        .where('userID', '==', userID)
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
            setAnswers([...answers, ...q]);
            setLastDocument(querySnapshot.docs[querySnapshot.docs.length - 1]);
          }
        });
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
    <View style={styles.container}>
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
    </View>
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
