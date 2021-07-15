import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet, ListItem } from 'react-native-elements';
import crashlytics from '@react-native-firebase/crashlytics';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { GREY, ORANGE, WHITE } from '../assets/colors/colors';
import EditIcon from '../utilities/Icons/EditIcon';
import DeleteIcon from '../utilities/Icons/DeleteIcon';
import ReportIcon from '../utilities/Icons/ReportIcon';
import { Context } from '../contexts';

const MoreOptionsQuestionBottomSheet = ({
  popupVisible,
  isPopupVisible,
  questionId,
  questionerUId,
  content,
  navigate,
  noOfReports,
  goBack,
  route,
}) => {
  const {
    state: { userID },
  } = useContext(Context);

  let LIST = [
    {
      title: 'Edit',
      icon: <EditIcon size={20} />,
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => editSelectedQuestion(),
    },
    {
      title: 'Delete',
      icon: <DeleteIcon size={20} />,
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => deleteSelectedQuestion(),
    },
    {
      title: 'Report',
      icon: <ReportIcon size={20} />,
      titleStyle: styles.buttonText,
      containerStyle: styles.buttonContainer,
      onPress: () => reportSelectedQuestion(),
    },
    {
      title: 'Cancel',
      containerStyle: styles.cancelContainer,
      titleStyle: styles.cancelButton,
      onPress: () => isPopupVisible(false),
    },
  ];

  if (questionerUId !== userID) {
    LIST = LIST.splice(2, 2);
  }

  const editSelectedQuestion = () => {
    isPopupVisible(false);
    navigate('EditorScreen', {
      content,
      questionId: questionId,
      functionName: 'updateQuestion',
      headerText: 'Update Your Question',
    });
  };

  const deleteSelectedQuestion = async () => {
    try {
      firestore()
        .collection('questions')
        .doc(questionId)
        .delete()
        .then(() => {
          console.log('Question deleted!');
        });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Question deleted.',
        text2: 'Shush 🤫',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });
    } catch (err) {
      console.log('error deleting Question:', err);
      crashlytics().log(
        'error deleting Question, deleteSelectedQuestion, QuestioMoreOverlayComponent',
      );
      crashlytics().recordError(err);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Oops! Something went wrong.',
        text2: 'Please, try again.😒',
        visibilityTime: 1000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 40,
      });
    }
    isPopupVisible(false);
    route.name === 'QuestionDetails' && goBack();
  };

  const reportSelectedQuestion = async () => {
    if (noOfReports > 5) {
      try {
        await firestore().collection('questions').doc(questionId).delete();
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Question is Repoted.',
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
          .update({
            noOfReports: noOfReports + 1,
          });
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Question is Repoted.',
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
    <BottomSheet
      isVisible={popupVisible}
      modalProps={{
        animationType: 'slide',
        onRequestClose: () => isPopupVisible(false),
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

export default React.memo(MoreOptionsQuestionBottomSheet);
