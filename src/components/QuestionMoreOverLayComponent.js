import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Card, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';

const WIDTH = Dimensions.get('window').width;

const QuestionMoreOverlayComponent = ({
  popupVisible,
  isPopupVisible,
  question,
  navigate,
  goBack,
}) => {
  const route = useRoute();
  const { id, content, tags } = question;

  const editQuestion = () => {
    isPopupVisible(false);
    navigate('EditorScreen', {
      content,
      tags,
      questionId: id,
      functionName: 'updateQuestion',
    });
  };

  const deleteSelectedQuestion = async () => {
    try {
      firestore()
        .collection('questions')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Question deleted!');
        });
    } catch (err) {
      console.log('error deleting Question:', err);
    }
    isPopupVisible(false);
    route.name === 'QuestionDetails' && goBack();
  };

  return (
    <Overlay
      isVisible={popupVisible}
      onBackdropPress={() => isPopupVisible(false)}
      overlayStyle={styles.overlayStyle}
      backdropStyle={styles.backdropStyle}>
      <Pressable onPress={editQuestion} style={styles.button}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
      <Card.Divider />
      <Pressable onPress={deleteSelectedQuestion} style={styles.button}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 5,
    elevation: 50,
  },
  backdropStyle: {
    backgroundColor: 'transparent',
  },
  button: {
    height: 25,
    width: WIDTH * 0.5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    letterSpacing: 1,
  },
});

export default QuestionMoreOverlayComponent;
