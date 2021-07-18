import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import { Card, FAB, Header, Text } from 'react-native-elements';
import { Context } from '../contexts';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsonQuestionComponent from '../components/CommentsonQuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import { DEEP_GREEN, WHITE } from '../assets/colors/colors';
import DotsLottie from '../components/UI/DotsLottie';
import BackArrowIcon from '../utilities/Icons/BackArrowIcon';
import ShareIcon from '../utilities/Icons/ShareIcon';

const QuestionDetailsScreen = ({ navigation, route }) => {
  const questionIdfromProps = route.params.questionID;
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchQuestion = firestore()
      .collection('questions')
      .doc(questionIdfromProps)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          setQuestion(querySnapshot._data);
        }
      });
    // clean up
    return () => {
      fetchQuestion();
    };
  }, [questionIdfromProps]);

  useEffect(() => {
    const fetchAnswers = firestore()
      .collection('questions')
      .doc(questionIdfromProps)
      .collection('answers')
      .onSnapshot((querySnapshot) => {
        const ans = [];
        querySnapshot &&
          querySnapshot.forEach((documentSnapshot) => {
            ans.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
        ans.length > 0 ? setAnswers(ans) : setModalVisible(true);
        setLoadingAnswers(false);
      });
    return () => {
      fetchAnswers();
    };
  }, [questionIdfromProps]);

  const renderItems = ({ item }) => {
    return (
      <AnswerComponent
        answer={item}
        questionId={questionIdfromProps}
        route={route}
        navigation={navigation}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        statusBarProps={{ backgroundColor: WHITE, barStyle: 'dark-content' }}
        backgroundColor={WHITE}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackArrowIcon size={22} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity onPress={() => shareQuestion(questionIdfromProps)}>
            <ShareIcon size={22} />
          </TouchableOpacity>
        }
        containerStyle={styles.headerContainer}
      />
      {loadingAnswers ? (
        <View style={styles.loadingContainer}>
          <DotsLottie text="Loading Answers 📚" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              {/** Question is Displayed */}
              <Card containerStyle={styles.card}>
                <QuestionHeaderComponent
                  userDisplayName={question.userDisplayName}
                  createdAt={question.createdAt}
                />
                <QuestionBodyComponent
                  content={question.content}
                  param="questiondetails"
                />
                <Card.Divider />
                {/** Interaction with Question: upvote, tag */}
                <QuestionDetailBottomComponent
                  question={question}
                  questionId={questionIdfromProps}
                />
                {/** Comments on Question */}
                <CommentsonQuestionComponent
                  userName={userDisplayName}
                  userId={userID}
                  noOfReports={question.noOfReports}
                  questionId={questionIdfromProps}
                />
              </Card>

              {modalVisible ? (
                <Text style={styles.modalText}>
                  Know someone who can answer? Share this question via facebook,
                  text or email.
                </Text>
              ) : (
                <View>
                  <Text style={styles.headerText}>Answers</Text>
                </View>
              )}
            </>
          }
          renderItem={renderItems}
          data={answers}
          keyExtractor={(answer) => answer.id}
          maxToRenderPerBatch={4}
          initialNumToRender={3}
          updateCellsBatchingPeriod={100}
          ListFooterComponent={
            <View style={styles.footerText}>
              <Text>You have reached the end 👽</Text>
            </View>
          }
          style={styles.flatListContainer}
        />
      )}
      <FAB
        title="Answer 🎯"
        placement="right"
        onPress={() =>
          navigation.navigate('EditorScreen', {
            questionId: questionIdfromProps,
            functionName: 'submitAnswer',
            headerText: 'Write an Answer',
          })
        }
        color={DEEP_GREEN}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headerContainer: {
    height: 60,
  },
  card: {
    width: '100%',
    elevation: 2,
    marginHorizontal: 0,
    padding: '5%',
  },
  flatListContainer: {
    backgroundColor: WHITE,
  },
  loadingContainer: {
    height: '40%',
    flexDirection: 'row',
    marginLeft: '25%',
    alignItems: 'center',
    alignContent: 'center',
    top: '20%',
  },
  lastItem: {
    height: 130,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    marginVertical: 5,
    marginHorizontal: 10,
    letterSpacing: 1.2,
  },
  footerText: {
    height: 120,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  modalText: {
    padding: 25,
  },
});

export default QuestionDetailsScreen;
