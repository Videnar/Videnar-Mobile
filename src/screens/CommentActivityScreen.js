import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  Text,
  View,
  RefreshControl,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API } from 'aws-amplify';
import {
  listCommentOnQuestions,
  listCommentOnAnswers,
} from '../graphql/queries';
import { AuthContext } from '../contexts/AuthContext';
import CommentComponent from '../components/CommentComponent';

const ActivityScreen = ({ navigation }) => {
  const route = useRoute();
  const {
    state: { username },
  } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    fetchCommentOnQuestion();
    fetchCommentsOnAnswer();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCommentOnQuestion();
    fetchCommentsOnAnswer();
    setRefreshing(false);
  }, []);

  const fetchCommentOnQuestion = async (id) => {
    try {
      const list = await API.graphql({
        query: listCommentOnQuestions,
        variables: {
          filter: { username: { eq: username } },
        },
      });
      const comments = list.data.listCommentOnQuestions.items;
      setItems(comments);
    } catch (err) {
      console.log('error fetching commentsOnQuestion', err);
    }
  };

  const fetchCommentsOnAnswer = async () => {
    try {
      const list = await API.graphql({
        query: listCommentOnAnswers,
        variables: {
          filter: { username: { eq: username } },
        },
      });
      const comments = list.data.listCommentOnAnswers.items;
      // console.log(items, comments, 'commentsOnAnswer');
      setItems([...items, ...comments]);
    } catch (err) {
      console.log('error fetching commentsOnAnswer', err);
    }
  };

  const RenderItem = ({ item }) => (
    <Pressable
      onPress={() => {
        route.name !== 'QuestionDetails' &&
          navigation.navigate('QuestionDetails', {
            questionID: item.questionID,
          });
      }}>
      <Text>{item.content}</Text>
    </Pressable>
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
        keyExtractor={(item) => item.id + item.createdAt}
        style={styles.FlatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  questionTitle: { fontSize: 18 },
  container: { flex: 1, backgroundColor: '#fff8f5' },
});

export default ActivityScreen;
