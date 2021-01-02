import React, {useState, useEffect, useContext} from 'react';
import {Button, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {listQuestions} from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import {Context as AuthContext} from '../contexts/AuthContext';

const HomeScreen = ({navigation}) => {
  // const {tryLocalSignin} = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // useEffect(() => {
  //   tryLocalSignin();
  // }, []);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const tryLocalSignin = (dispatch) => async () => {
    try {
      await Auth.currentAuthenticatedUser()
        .then(({attributes}) => dispatch({type: 'signin', payload: attributes}))
        .catch((err) => console.log(err));
    } catch (err) {
      navigation.navigate('Signin');
    }
  };

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
    <QuestionComponent question={item} navigate={navigation.navigate} />
  );

  return (
    <>
      <Button
        title="Question"
        onPress={() => {
          navigation.navigate('AskQuestion');
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
