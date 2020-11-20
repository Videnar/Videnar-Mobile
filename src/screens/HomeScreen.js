import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listQuestions} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';

const HomeScreen = (props) => {
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
      setQuestions([...questionsData]);
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  const RenderItem = ({item}) => (
    <QuestionComponent question={item} navigate={props.navigation.navigate} />
  );

  return (
    <>
      <Button
        title="Question"
        onPress={() => {
          props.navigation.navigate('AskQuestion');
        }}
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
    </>
  );
};

const styles = StyleSheet.create({
  FlatList: {marginHorizontal: 2},
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
});

export default HomeScreen;
