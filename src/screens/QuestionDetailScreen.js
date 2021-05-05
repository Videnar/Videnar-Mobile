import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Card, Header, Icon, Text } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsComponent from '../components/CommentsComponent';
import AnswersComponent from '../components/AnswersComponent';
import ProceedToAnswerComponent from '../components/ProceedToAnswerComponent';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const QuestionDetailScreen = (props) => {
  const {
    state: { userDisplayName, userID },
  } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(null);

  const [questionLoaded, setQuestionLoaded] = useState(false);

  useEffect(() => {
    const questionIdfromProps = props.route.params.questionID;
    setQuestionId(questionIdfromProps);

    //Fetching Question from DB by question ID
    const fetchQuestion = async () => {
      try {
        const { _data } = await firestore()
          .collection('questions')
          .doc(questionId)
          .get();
        await setQuestion(_data);
        await setQuestionLoaded(true);
      } catch (err) {
        console.log('error fetching answers', err);
      }
    };

    !question && fetchQuestion();
  }, [questionId, question, props.route.params.questionID]);

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
            <QuestionDetailBottomComponent question={question} />
            {/** Comments on Question */}
            <CommentsComponent
              headerText="Comments on Question"
              userName={userDisplayName}
              userId={userID}
              questionId={questionId}
            />
          </Card>
        )}
        {/** Load Answers if Question fetch is completed or show Loading... */}
        {questionLoaded ? (
          <AnswersComponent questionID={questionId} />
        ) : (
          <View style={styles.loadingContainer}>
            <Text> Loading... </Text>
          </View>
        )}
      </ScrollView>
      <ProceedToAnswerComponent />
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
