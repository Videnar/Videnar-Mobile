import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  FlatList,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import QuestionComponent from '../components/QuestionComponent';
import FloatingAskQuestionButton from '../components/FloatingAskQuestionButton';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';
import { useRoute } from '@react-navigation/native';
import { Context } from '../contexts';
import LoadingAnimation from '../components/UI/LoadingAnimation';
import LoadingCircle from '../components/UI/LoadingCircle';
import { GREY } from '../assets/colors/colors';
import { getExamsString } from '../utilities/functions';

const HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const { changeScreen, state } = useContext(Context);
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDocument, setLastDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMoreQuestionsLoading, setIsMoreQuestionsLoading] = useState(false);
  const [examsListString, setExamsListString] = useState('');

  const route = useRoute();

  useEffect(() => {
    const examsString = getExamsString(state.preferences.exams);
    setExamsListString(examsString);
    fetchQuestions();
  }, [fetchQuestions, state.preferences.exams]);

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
      crashlytics().log('Error fetching questions, fetchQuestions, HomeScreen');
      crashlytics().recordError(err);
    } finally {
      setLoading(false);
    }
  }, [state.preferences.exams]);

  const loadMoreQuestions = useCallback(async () => {
    setIsMoreQuestionsLoading(true);
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
      crashlytics().log(
        'Error fetching more questions, loadMoreQuestions, HomeScreen',
      );
      crashlytics().recordError(err);
    } finally {
      setIsMoreQuestionsLoading(false);
    }
  }, [questions, lastDocument, state.preferences.exams]);

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
      {isMoreQuestionsLoading ? (
        <LoadingCircle height="90%" width="90%" />
      ) : (
        <Text>No more questions to show 🐹</Text>
      )}
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Videnar</Text>
          <Text>{examsListString}</Text>
          <Icon
            name="filter"
            type="fontisto"
            iconStyle={styles.icon}
            onPress={() => changeScreen('UserPref', 'Main')}
          />
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
  headerContainer: {
    flexDirection: 'row',
  },
  headerText: {
    color: DEEP_GREEN,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingLeft: '2%',
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
  icon: {
    paddingRight: 5,
    color: GREY,
  },
});

export default HomeScreen;
