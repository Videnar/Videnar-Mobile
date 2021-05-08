import React, { useState, useEffect, useContext } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Context } from '../contexts';
import QuestionComponent from '../components/QuestionComponent';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userDisplayName },
  } = useContext(Context);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
      } catch (err) {
        console.log('error fetching questions', err);
      }
    };
    fetchQuestions();
  }, [userDisplayName]);

  const RenderItem = (item) => (
    <QuestionComponent question={item} navigation={navigation} />
  );

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

export default React.memo(ActivityScreen);
