import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { API } from 'aws-amplify';
import { listAnswers } from '../graphql/queries';
import { AuthContext } from '../contexts/AuthContext';
import AnswerComponent from '../components/AnswerComponent';

const AnswerActivityScreen = () => {
  const {
    state: { username },
  } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const list = await API.graphql({
          query: listAnswers,
          variables: {
            filter: { username: { eq: username } },
          },
        });
        const answersList = list.data.listAnswers.items;
        setItems(answersList);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };
    fetchAnswers();
  }, [username]);

  const RenderItem = ({ item }) => <AnswerComponent answer={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={RenderItem}
        keyExtractor={(item) => item.id}
        style={styles.FlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AnswerActivityScreen;
