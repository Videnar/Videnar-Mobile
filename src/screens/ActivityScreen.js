import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Context } from '../contexts';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const ref = firestore().collectionGroup('comments');
        const allCommentsRes = await ref.where('userID', '==', userID).get();
        console.log('allCommentsRes', allCommentsRes._docs);
      } catch (err) {
        console.log('error fetching questions', err);
      }
    };
    fetchQuestions();
  }, [userDisplayName, userID]);

  const RenderItem = (item) => (
    <QuestionComponent question={item} navigation={navigation} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
      <FloatingAskQuestionButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default React.memo(ActivityScreen);
