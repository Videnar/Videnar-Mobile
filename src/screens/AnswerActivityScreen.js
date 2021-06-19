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
      <Text>No More Answers to Show</Text>
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
