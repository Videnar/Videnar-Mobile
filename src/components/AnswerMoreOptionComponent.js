import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { BottomSheet, Icon, ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { navigate } from '../navigation/RootNavigation';
import { GREY, ORANGE, WHITE } from '../assets/colors/colors';

const AnswerMoreOptionComponent = ({
  answerId,
  questionId,
  noOfReports,
  answerContent,
}) => {
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);

  const LIST = [
    {
      title: 'Edit',
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => onEditHandler(),
    },
    {
      title: 'Delete',
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => onDeleteHandler(),
    },
    {
      title: 'Report',
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => onReportHandler(),
    },
    {
      title: 'Cancel',
      containerStyle: styles.cancelContainer,
      titleStyle: styles.cancelButton,
      onPress: () => setMoreOptionVisible(false),
    },
  ];

  const onEditHandler = async () => {
    setMoreOptionVisible(false);
    navigate('EditorScreen', {
      content: answerContent,
      questionId,
      answerId,
      functionName: 'updateAnswer',
      headerText: 'Update Your Answer',
    });
  };

  const onDeleteHandler = async () => {
    setMoreOptionVisible(false);
    try {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('answers')
        .doc(answerId)
        .delete();
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Answer deleted.',
        text2: 'Shush 🤫',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });
    } catch (err) {
      crashlytics().log(
        'error deleting answer, onDeleteHandler, AnswerMoreOptionsComponent',
      );
      crashlytics().recordError(err);
      console.log('error deleting answer:', err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Opps! Something went wrong.',
        text2: 'Please, try again 🤕',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });
    }
  };

  const onReportHandler = async () => {
    if (noOfReports > 5) {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('answers')
          .doc(answerId)
          .delete();
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Answer is Repoted.',
          text2: 'Thank you for reporting 🙂 ',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      } catch (err) {
        crashlytics().log(
          'error deleting answer, onDeleteHandler, AnswerMoreOptionsComponent',
        );
        crashlytics().recordError(err);
        console.log('error deleting answer:', err);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Opps! Something went wrong.',
          text2: 'Please, try again 🤕',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      }
    } else {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('answers')
          .doc(answerId)
          .update({
            noOfReports: noOfReports + 1,
          });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Answer is Repoted.',
          text2: 'Thank you for reporting 🙂 ',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      } catch (err) {
        crashlytics().log(
          'error deleting answer, onDeleteHandler, AnswerMoreOptionsComponent',
        );
        crashlytics().recordError(err);
        console.log('error deleting answer:', err);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Opps! Something went wrong.',
          text2: 'Please, try again 🤕',
          visibilityTime: 1000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 40,
        });
      }
    }
  };

  return (
    <>
      <Icon
        type="material"
        name="more-vert"
        onPress={() => setMoreOptionVisible(true)}
      />
      <BottomSheet
        isVisible={moreOptionVisible}
        modalProps={{
          animationType: 'slide',
          onRequestClose: () => setMoreOptionVisible(false),
        }}
        containerStyle={styles.container}>
        {LIST.map((item, key) => (
          <ListItem
            key={key}
            containerStyle={item.containerStyle}
            onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.1)',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  buttonText: {
    letterSpacing: 1,
    fontWeight: '700',
    color: GREY,
    alignSelf: 'center',
    fontSize: 18,
  },
  iconStyle: {
    top: 2,
  },
  cancelContainer: {
    backgroundColor: WHITE,
  },
  cancelButton: {
    color: ORANGE,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    alignSelf: 'center',
  },
});

export default AnswerMoreOptionComponent;
