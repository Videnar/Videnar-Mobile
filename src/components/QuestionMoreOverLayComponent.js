import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Divider, Icon, Overlay, Text } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { GREY } from '../assets/colors/colors';
import { View } from 'react-native';

const WIDTH = Dimensions.get('window').width;

const QuestionMoreOverlayComponent = ({
  popupVisible,
  isPopupVisible,
  questionId,
  content,
  navigate,
  goBack,
  route,
}) => {
  const editQuestion = () => {
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

  return (
    <Overlay
      isVisible={popupVisible}
      onBackdropPress={() => isPopupVisible(false)}
      overlayStyle={styles.overlayStyle}
      backdropStyle={styles.backdropStyle}>
      <Pressable onPress={editQuestion} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Edit</Text>
        </View>
        <View>
          <Icon type="material" name="edit" color={GREY} />
        </View>
      </Pressable>
      <Divider />
      <Pressable onPress={deleteSelectedQuestion} style={styles.button}>
        <View>
          <Text style={styles.buttonText}>Delete</Text>
        </View>
        <View>
          <Icon type="material" name="delete" color={GREY} />
        </View>
      </Pressable>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 5,
    elevation: 20,
  },
  backdropStyle: {
    backgroundColor: 'transparent',
  },
  button: {
    width: WIDTH * 0.45,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: WIDTH * 0.1,
    paddingVertical: 5,
  },
  buttonText: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '700',
    color: GREY,
  },
});

export default React.memo(QuestionMoreOverlayComponent);
