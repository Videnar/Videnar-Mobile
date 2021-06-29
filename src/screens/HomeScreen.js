import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';
import { useRoute } from '@react-navigation/native';
import { Context } from '../contexts';
import LoadingAnimation from '../components/UI/LoadingAnimation';

const HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions, state.exams, state.preferences, questions]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuestions();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchQuestions = async () => {
    try {
      const snapShot = await firestore()
        .collection('questions')
        .where('exams', 'array-contains-any', state.preferences.exams)
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
      } else {
        setLastDocument(null);
      }
    } catch (err) {
      console.log('Error fetching questions', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreQuestions = async () => {
    try {
      if (lastDocument) {
        const snapShot = await firestore()
          .collection('questions')
          .where('exams', 'array-contains-any', state.preferences.exams)
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
    }
  };

  const RenderItem = ({ item }) => {
    return (
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
  };

  const getItemLayOut = (data, index) => ({
    length: HEIGHT * 0.25,
    offset: 5 * index,
    index,
  });

  const lastItem = (
    <View style={styles.lastItem}>
      <Text>No more questions to show 🐹</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View>
          <Text style={styles.headerText}>Videnar</Text>
        </View>
        {loading ? (
          <LoadingAnimation autoplay={loading} />
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
        <FloatingAskQuestionButton navigation={navigation} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WHITE },
  headerText: {
    color: DEEP_GREEN,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    paddingLeft: '5%',
  },
  FlatList: { marginHorizontal: 2 },
  lastItem: {
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  loadingClock: {
    height: '80%',
    width: '80%',
    alignSelf: 'center',
  },
  loadingTextContainer: {
    height: '10%',
    flexDirection: 'row',
    marginLeft: '5%',
    bottom: 40,
  },
  loadingText: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingTop: '3%',
  },
  loadingDots: {
    height: 50,
  },
});

export default HomeScreen;
