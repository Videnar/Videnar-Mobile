import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { BottomSheet, ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import { navigate } from '../navigation/RootNavigation';
import { GREY, ORANGE, WHITE } from '../assets/colors/colors';
import MoreIcon from '../utilities/Icons/MoreIcon';
import EditIcon from '../utilities/Icons/EditIcon';
import DeleteIcon from '../utilities/Icons/DeleteIcon';
import ReportIcon from '../utilities/Icons/ReportIcon';
import { Context } from '../contexts';

const AnswerMoreOptionComponent = ({
  answerId,
  questionId,
  answererId,
  noOfReports,
  answerContent,
}) => {
  const {
    state: { userID },
  } = useContext(Context);
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);

  let LIST = [
    {
      title: 'Edit',
      icon: <EditIcon size={20} />,
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => onEditHandler(),
    },
    {
      title: 'Delete',
      icon: <DeleteIcon size={20} />,
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => onDeleteHandler(),
    },
    {
      title: 'Report',
      icon: <ReportIcon size={20} />,
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

  // Deciding which options to show
  if (answererId !== userID) {
    LIST.splice(0, 2);
  } else {
    LIST.splice(2, 1);
  }

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
      <TouchableOpacity
        onPress={() => setMoreOptionVisible(true)}
        style={styles.iconContainer}>
        <MoreIcon size={16} />
      </TouchableOpacity>
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
                {item.title} {item.icon}
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
