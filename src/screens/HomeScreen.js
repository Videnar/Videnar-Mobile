import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { listQuestions } from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import { Header } from 'react-native-elements';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';

const HomeScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchQuestions();
    setRefreshing(false);
  }, []);

  const fetchQuestions = async () => {
    try {
      const responseData = await API.graphql(graphqlOperation(listQuestions));
      const questionsData = responseData.data.listQuestions.items;
      setQuestions(questionsData);
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  const RenderItem = ({ item }) => (
    <QuestionComponent question={item} navigation={navigation} />
  );

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
  container: { flex: 1, backgroundColor: 'white' },
});

export default HomeScreen;
