import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Header, Icon, Text } from 'react-native-elements';
import { Context } from '../contexts';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsonQuestionComponent from '../components/CommentsonQuestionComponent';
import AnswersComponent from '../components/AnswersComponent';
import ProceedToAnswerComponent from '../components/ProceedToAnswerComponent';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const QuestionDetailScreen = (props) => {
  const questionIdfromProps = props.route.params.questionID;
  const {
    state: { userDisplayName, userID },
  } = useContext(Context);

  const [question, setQuestion] = useState(null);

  const [questionLoaded, setQuestionLoaded] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionIdfromProps)
          .onSnapshot((querySnapshot) => {
            setQuestion(querySnapshot._data);
          });
        await setQuestionLoaded(true);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    fetchQuestion();
  }, [questionIdfromProps]);

  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        leftComponent={
          <Icon
            type="material"
            name="arrow-back"
            onPress={() => props.navigation.goBack()}
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
      <ScrollView>
        {/** Question is Displayed */}
        {question && (
          <Card containerStyle={styles.card}>
            <QuestionHeaderComponent userDisplayName={userDisplayName} />
            <QuestionBodyComponent content={question.content} />
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
        {/** Load Answers if Question fetch is completed or show Loading... */}
        {questionLoaded ? (
          <AnswersComponent questionID={questionIdfromProps} />
        ) : (
          <View style={styles.loadingContainer}>
            <Text> Loading... </Text>
          </View>
        )}
      </ScrollView>
      <ProceedToAnswerComponent questionID={questionIdfromProps} />
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
});

export default QuestionDetailScreen;
