import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.scrollView}>
      <Button
        title="Question"
        onPress={() => {
          props.navigation.navigate('AskQuestion');
        }}
      />
      {questions.map((question, index) => (
        <View key={question.id ? question.id : index}>
          <QuestionComponent
            question={question}
            navigate={props.navigation.navigate}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {marginHorizontal: 2},
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
});

export default HomeScreen;
