import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Header } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const subscriber = fetchQuestions();

    return () => subscriber();
  }, [fetchQuestions]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchQuestions();
    setRefreshing(false);
  }, [fetchQuestions]);

  const fetchQuestions = useCallback(async () => {
    try {
      firestore()
        .collection('Questions')
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((documentSnapshot) => {
            questions.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setQuestions(questions);
          setLoading(false);
        });
    } catch (err) {
      console.log('error fetching questions', err);
    }
  }, [questions]);

  const RenderItem = ({ item }) => (
    <QuestionComponent question={item} navigation={navigation} />
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Header
        statusBarProps={{ barStyle: 'dark-content', backgroundColor: 'white' }}
        placement="left"
        centerComponent={{
          text: 'Videnar',
          style: {
            color: '#A97CB0',
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
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
      {/* FAB */}
      <FloatingAskQuestionButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: { marginHorizontal: 2 },
  container: { flex: 1 },
});

export default HomeScreen;
