import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Divider, Icon, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { navigate } from '../navigation/RootNavigation';
import { GREY } from '../assets/colors/colors';

const AnswerMoreOptionComponent = ({ answerId, questionId, answerContent }) => {
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);

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

  return (
    <>
      <Icon
        type="material"
        name="more-vert"
        onPress={() => setMoreOptionVisible(true)}
      />
      <Overlay
        isVisible={moreOptionVisible}
        onBackdropPress={() => {
          setMoreOptionVisible(false);
        }}
        overlayStyle={styles.overlay}
        backdropStyle={styles.backdrop}>
        {/** Edit */}
        <Pressable onPress={onEditHandler} style={styles.button}>
          <View>
            <Text style={styles.optionText}>Edit</Text>
          </View>
          <View>
            <Icon type="material" name="edit" color={GREY} />
          </View>
        </Pressable>
        <Divider />
        {/** Delete */}
        <Pressable onPress={onDeleteHandler} style={styles.button}>
          <View>
            <Text style={styles.optionText}>Delete</Text>
          </View>
          <View>
            <Icon type="material" name="delete" color={GREY} />
          </View>
        </Pressable>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 5,
    elevation: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  button: {
    width: '45%',
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '10%',
    paddingVertical: 5,
  },
  optionText: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '700',
    color: GREY,
  },
});

export default AnswerMoreOptionComponent;
