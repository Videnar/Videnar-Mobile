import React, {useState, useEffect, useContext} from 'react';
import {FlatList, View, RefreshControl, StyleSheet} from 'react-native';
import {API} from 'aws-amplify';
import {listAnswers} from '../graphql/queries';
import {AuthContext} from '../contexts/AuthContext';
import AnswerComponent from '../components/AnswerComponent';

const AnswerActivityScreen = ({navigation}) => {
  const {
    state: {username},
  } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchAnswers();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAnswers();
    setRefreshing(false);
  }, []);

  const fetchAnswers = async () => {
    try {
      const list = await API.graphql({
        query: listAnswers,
        variables: {
          filter: {username: {eq: username}},
        },
      });
      const answersList = list.data.listAnswers.items;
      setItems([...items, ...answersList]);
    } catch (err) {
      console.log('error fetching answers', err);
    }
  };

  const RenderItem = ({item}) => (
    <AnswerComponent answer={item} navigate={navigation.navigate} />
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

export default AnswerActivityScreen;
