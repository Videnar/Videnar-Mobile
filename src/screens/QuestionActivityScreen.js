import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import { Text } from 'react-native-elements';
import QuestionComponent from '../components/QuestionComponent';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const results = await firestore()
          .collection('questions')
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
          .onSnapshot((querySnapshot) => {
            const q = [];
            querySnapshot &&
              querySnapshot.forEach((documentSnapshot) => {
                q.push({
                  ...documentSnapshot.data(),
                  id: documentSnapshot.id,
                });
              });
            setQuestions(q);
          });
        setQuestions([...results._docs]);
      } catch (err) {
        console.log('error fetching questions 4', err);
      }
    };
    fetchQuestions();
  }, [userDisplayName, userID]);

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
        initialNumToRender={3}
        updateCellsBatchingPeriod={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default React.memo(ActivityScreen);
