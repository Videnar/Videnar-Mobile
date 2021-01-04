import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { listQuestions } from '../graphql/queries';
import QuestionComponent from '../components/QuestionComponent';
import { Context as AuthContext } from '../contexts/AuthContext';
import { Fab, Icon, View } from 'native-base'

const HomeScreen = (props) => {
  const { tryLocalSignin } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // useEffect(() => {
  //   tryLocalSignin();
  // }, [tryLocalSignin]);

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

  const RenderItem = ({ item }) => (
    <QuestionComponent question={item} navigate={props.navigation.navigate} />
  );

  return (
    <View style={{ flex: 0 }}>
      <Fab
        position='bottomRight'
        direction='up'
        containerStyle={{}}
        style={{ backgroundColor: '#cf391b' }}
        onPress={() => {
          props.navigation.navigate('AskQuestion');
        }}
      >
        <Icon name='plus' type='FontAwesome' />
      </Fab>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={questions}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: { marginHorizontal: 2 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  questionTitle: { fontSize: 18 },
});

export default HomeScreen;
