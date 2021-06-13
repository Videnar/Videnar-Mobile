import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Card, FAB, Header, Icon, Text } from 'react-native-elements';
import { Context } from '../contexts';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsonQuestionComponent from '../components/CommentsonQuestionComponent';
import AnswerComponent from '../components/AnswerComponent';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const QuestionDetailsScreen = ({ navigation, route }) => {
  const questionIdfromProps = route.params.questionID;
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);

  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestion = firestore()
      .collection('questions')
      .doc(questionIdfromProps)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          setQuestion(querySnapshot._data);
        }
      });
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
    // clean up
    return () => {
      fetchQuestion();
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
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <Icon
            type="material"
            name="more-vert"
            onPress={() => console.log('Clicked')}
          />
        }
        backgroundColor="white"
      />
      <FlatList
        ListHeaderComponent={
          <>
            {/** Question is Displayed */}
            {question && (
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
            <Text>No More Answers to Show</Text>
          </View>
        }
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
          })
        }
        color="#3DDC84"
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: WIDTH,
    elevation: 2,
    marginHorizontal: 0,
    marginVertical: 5,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    height: HEIGHT,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  footerText: {
    height: 100,
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
});

export default QuestionDetailsScreen;
