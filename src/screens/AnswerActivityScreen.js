import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { Context } from '../contexts';
import AnswerComponent from '../components/AnswerComponent';
import { WHITE } from '../assets/colors/colors';
import DotsLottie from '../components/UI/DotsLottie';
import { useRoute } from '@react-navigation/native';

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userID },
  } = useContext(Context);
  const [answers, setAnswers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const route = useRoute();

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAnswers();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const fetchAnswers = useCallback(async () => {
    try {
      const snapShot = await firestore()
        .collectionGroup('answers')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();

      if (!snapShot.empty) {
        let newAnswers = [];
        setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

        for (let q = 0; q < snapShot.docs.length; q++) {
          newAnswers.push({
            ...snapShot.docs[q].data(),
            id: snapShot.docs[q].id,
          });
        }

        setAnswers(newAnswers);
      } else {
        setLastDocument(null);
      }
    } catch (err) {
      console.log('error fetching answers', err);
      crashlytics().recordError(err);
    } finally {
      setLoadingAnswers(false);
    }
  }, [userID]);

  const loadMoreAnswers = useCallback(async () => {
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collectionGroup('answers')
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDocument)
          .limit(16)
          .get();

        if (!snapShot.empty) {
          let newAnswers = [];
          setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

          for (let q = 0; q < snapShot.docs.length; q++) {
            newAnswers.push({
              ...snapShot.docs[q].data(),
              id: snapShot.docs[q].id,
            });
          }

          setAnswers(newAnswers);
        } else {
          setLastDocument(null);
        }
      }
    } catch (err) {
      console.log('error fetching questions', err);
      crashlytics().recordError(err);
    }
  }, [lastDocument, userID]);

  const RenderItem = ({ item }) => {
    return (
      <AnswerComponent
        answer={item}
        questionId={item.questionID}
        route={route}
        navigation={navigation}
      />
    );
  };

  const lastItem = (
    <View style={styles.lastItem}>
      {answers.length === 0 ? (
        <Text>You have not answered any questions yet 😐</Text>
      ) : (
        <Text>You have reached the end 💀</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      {loadingAnswers ? (
        <View style={styles.loadingContainer}>
          <DotsLottie text="Loading your answers 📝" />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={answers}
          renderItem={RenderItem}
          ListFooterComponent={lastItem}
          keyExtractor={(item) => item.id}
          style={styles.FlatList}
          maxToRenderPerBatch={4}
          initialNumToRender={3}
          updateCellsBatchingPeriod={100}
          onEndReachedThreshold={0.5}
          onEndReached={loadMoreAnswers}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  lastItem: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingContainer: {
    height: '50%',
    flexDirection: 'row',
    marginLeft: '25%',
    alignItems: 'center',
    alignContent: 'center',
    top: '20%',
  },
});

export default React.memo(ActivityScreen);
