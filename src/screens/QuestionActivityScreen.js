import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-elements';
import crashlytics from '@react-native-firebase/crashlytics';
import QuestionComponent from '../components/QuestionComponent';
import { WHITE } from '../assets/colors/colors';
import { useRoute } from '@react-navigation/native';
import { Context } from '../contexts';
import DotsLottie from '../components/UI/DotsLottie';
import LoadingCircle from '../components/UI/LoadingCircle';

const HEIGHT = Dimensions.get('window').height;

const ActivityScreen = ({ navigation }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [isMoreQuestionsLoading, setIsMoreQuestionsLoading] = useState(false);

  const route = useRoute();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuestions();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const fetchQuestions = useCallback(async () => {
    try {
      const snapShot = await firestore()
        .collection('questions')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .limit(6)
        .get();

      if (!snapShot.empty) {
        let newQuestions = [];
        setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

        for (let q = 0; q < snapShot.docs.length; q++) {
          newQuestions.push({
            ...snapShot.docs[q].data(),
            id: snapShot.docs[q].id,
          });
        }
        setQuestions(newQuestions);
        setLoadingQuestions(false);
      } else {
        setLastDocument(null);
      }
    } catch (err) {
      console.log('Error fetching questions', err);
      crashlytics().recordError(err);
    } finally {
      setLoadingQuestions(false);
    }
  }, [userID]);

  const loadMoreQuestions = useCallback(async () => {
    setIsMoreQuestionsLoading(true);
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collection('questions')
          .where('userID', '==', userID)
          .orderBy('createdAt', 'desc')
          .startAfter(lastDocument)
          .limit(6)
          .get();

        if (!snapShot.empty) {
          let newQuestions = [];
          setLastDocument(snapShot.docs[snapShot.docs.length - 1]);

          for (let q = 0; q < snapShot.docs.length; q++) {
            newQuestions.push({
              ...snapShot.docs[q].data(),
              id: snapShot.docs[q].id,
            });
          }
          setQuestions(questions.concat(newQuestions));

          if (snapShot.docs.length < 5) {
            setLastDocument(null);
          }
        } else {
          setLastDocument(null);
        }
      }
    } catch (err) {
      console.log('Error fetching more Questions', err);
      crashlytics().recordError(err);
    } finally {
      setIsMoreQuestionsLoading(false);
    }
  }, [lastDocument, userID, questions]);

  const RenderItem = ({ item }) => (
    <QuestionComponent
      key={item.id}
      questionId={item.id}
      questionerUId={item.userID}
      upVotesCount={item.upvotes}
      content={item.content}
      userDisplayName={item.userDisplayName}
      route={route}
      navigation={navigation}
    />
  );

  const lastItem = (
    <View style={styles.lastItem}>
      {questions.length === 0 ? (
        <Text>You have not asked any questions yet 😐</Text>
      ) : isMoreQuestionsLoading ? (
        <LoadingCircle height="130%" width="130%" />
      ) : (
        <Text>You have reached the end 👽</Text>
      )}
    </View>
  );

  const getItemLayOut = (data, index) => ({
    length: HEIGHT * 0.25,
    offset: 5 * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      {loadingQuestions ? (
        <View style={styles.loadingContainer}>
          <DotsLottie text="Loading Your questions 🦉" />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={questions}
          renderItem={RenderItem}
          ListFooterComponent={lastItem}
          style={styles.FlatList}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          onEndReachedThreshold={0.4}
          onEndReached={loadMoreQuestions}
          getItemLayout={getItemLayOut}
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
  FlatList: { marginHorizontal: 2 },
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
