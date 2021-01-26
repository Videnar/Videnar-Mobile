import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {API} from 'aws-amplify';
import {listQuestions} from '../graphql/queries';
import {AuthContext} from '../contexts/AuthContext';
import QuestionComponent from '../components/QuestionComponent';

const QuestionActivityScreen = ({navigation}) => {
  const {
    state: {username},
  } = useContext(AuthContext);
  const [items, setItems] = useState([]);
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
      const responseData = await API.graphql({
        query: listQuestions,
        variables: {
          filter: {username: {eq: username}},
        },
      });
      const questionsData = responseData.data.listQuestions.items;
      setItems([...items, ...questionsData]);
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  const RenderItem = ({item}) => (
    <QuestionComponent question={item} navigate={navigation.navigate} />
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={items}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
  container: {flex: 1, backgroundColor: '#fff8f5'},
});

export default QuestionActivityScreen;
