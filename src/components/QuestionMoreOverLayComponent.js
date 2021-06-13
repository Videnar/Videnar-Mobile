import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { Divider, Icon, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { GREY } from '../assets/colors/colors';
import { View } from 'react-native';

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

export default QuestionMoreOverlayComponent;
