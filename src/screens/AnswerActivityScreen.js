import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import AnswerComponent from '../components/AnswerComponent';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const ref = firestore().collectionGroup('answers');
        await ref
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
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
          });
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    fetchAnswers();
  }, [userDisplayName, userID]);

  const RenderItem = ({ item }) => {
    return <AnswerComponent answer={item} questionId={item.questionID} />;
  };

  const lastItem = (
    <View style={styles.lastItem}>
      <Text>No More Questions to Show</Text>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default React.memo(ActivityScreen);
