import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, FAB, Header, Icon, Text } from 'react-native-elements';
import { Context } from '../contexts';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsonQuestionComponent from '../components/CommentsonQuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import { DEEP_GREEN, GREY, WHITE } from '../assets/colors/colors';

const QuestionDetailsScreen = ({ navigation, route }) => {
  const questionIdfromProps = route.params.questionID;
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(true);

  useEffect(() => {
    const fetchQuestion = firestore()
      .collection('questions')
      .doc(questionIdfromProps)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          setQuestion(querySnapshot._data);
          setLoadingQuestion(false);
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
        setAnswers(ans);
      });
    return () => {
      fetchAnswers();
    };
  }, [questionIdfromProps]);

  const renderItems = ({ item }) => {
    return <AnswerComponent answer={item} questionId={questionIdfromProps} />;
  };

  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon
            type="material"
            name="arrow-back"
            size={30}
            color={GREY}
            onPress={() => navigation.goBack()}
          />
        }
        backgroundColor="white"
      />
      <FlatList
        ListHeaderComponent={
          <>
            {/** Question is Displayed */}
            {loadingQuestion ? (
              <Text>Loading</Text>
            ) : (
              <Card containerStyle={styles.card}>
                <QuestionHeaderComponent
                  userDisplayName={question.userDisplayName}
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
                  questionId={questionIdfromProps}
                />
              </Card>
            )}
            <View>
              <Text style={styles.headerText}>Answers</Text>
            </View>
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
        style={styles.container}
      />
      <FAB
        title="Answer"
        iconRight
        icon={<Icon type="material" name="add" color="white" />}
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
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    elevation: 2,
    marginHorizontal: 0,
    marginVertical: 5,
    padding: 10,
  },
  container: {
    backgroundColor: WHITE,
  },
  loadingContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
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
    color: GREY,
    marginVertical: 5,
    marginHorizontal: 10,
    letterSpacing: 1.2,
  },
  footerText: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default QuestionDetailsScreen;
