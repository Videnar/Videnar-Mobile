import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { API } from 'aws-amplify';
import { listQuestions } from '../graphql/queries';
import { AuthContext } from '../contexts/AuthContext';
import QuestionComponent from '../components/QuestionComponent';

const QuestionActivityScreen = () => {
  const {
    state: { username },
  } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const responseData = await API.graphql({
          query: listQuestions,
          variables: {
            filter: { username: { eq: username } },
          },
        });
        const questionsData = responseData.data.listQuestions.items;
        setItems(questionsData);
      } catch (err) {
        console.log('error fetching questions', err);
      }
    };
    fetchQuestions();
  }, [username]);

  const RenderItem = (item) => <QuestionComponent question={item} />;

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

export default React.memo(QuestionActivityScreen);
