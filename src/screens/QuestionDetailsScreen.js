import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { Card, FAB, Icon, Text } from 'react-native-elements';
import { Context } from '../contexts';
import firestore from '@react-native-firebase/firestore';
import QuestionHeaderComponent from '../components/QuestionHeaderComponent';
import QuestionBodyComponent from '../components/QuestionBodyComponent';
import QuestionDetailBottomComponent from '../components/QuestionDetailButtomComponent';
import CommentsonQuestionComponent from '../components/CommentsonQuestionComponent';
import AnswerComponent from '../components/AnswerComponent';
import { DEEP_GREEN, GREY, WHITE } from '../assets/colors/colors';
import DotsLottie from '../components/UI/DotsLottie';
import { shareQuestion } from '../utilities/functions';

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
        setTimeout(() => {
          setModalVisible(false);
        }, 10000);
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
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Icon
          type="material"
          name="arrow-back"
          containerStyle={styles.iconContainer}
          onPress={() => navigation.goBack()}
          size={30}
          color={GREY}
        />
      </View>
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
          style={styles.flatListContainer}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Know someone who can answer? Share this question via facebook,
              text or email.
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" type="material" color={GREY} size={20} />
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
              <Pressable
                style={styles.shareButton}
                onPress={() => shareQuestion(questionIdfromProps)}>
                <Icon name="share" type="material" color={GREY} size={20} />
                <Text style={styles.textStyle}>Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    height: '6%',
  },
  iconContainer: {
    height: 30,
    width: 30,
    marginVertical: 2,
    marginHorizontal: 10,
  },
  card: {
    width: '100%',
    elevation: 2,
    marginHorizontal: 0,
    marginVertical: 5,
    padding: 10,
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
    color: GREY,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  shareButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: DEEP_GREEN,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default QuestionDetailsScreen;
