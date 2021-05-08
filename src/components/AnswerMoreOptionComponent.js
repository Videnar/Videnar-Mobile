import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon, Overlay, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import { navigate } from '../navigation/RootNavigation';

const AnswerMoreOptionComponent = ({ answerId, questionId, answerContent }) => {
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);

  const onEditHandler = async () => {
    setMoreOptionVisible(false);
    navigate('EditorScreen', {
      content: answerContent,
      questionId,
      answerId,
      functionName: 'updateAnswer',
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
    } catch (err) {
      console.log('error deleting answer:', err);
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
        <Pressable onPress={onEditHandler}>
          <Text style={styles.optionText}>Edit</Text>
        </Pressable>
        <Divider />
        {/** Delete */}
        <Pressable onPress={onDeleteHandler}>
          <Text style={styles.optionText}>Delete</Text>
        </Pressable>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: 150,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  optionText: {
    margin: 5,
  },
});

export default AnswerMoreOptionComponent;
