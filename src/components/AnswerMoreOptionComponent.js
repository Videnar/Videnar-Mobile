import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon, Overlay, Text } from 'react-native-elements';

const AnswerMoreOptionComponent = () => {
  const [moreOptionVisible, setMoreOptionVisible] = useState(false);

  // Answer Edit Action
  const onEditHandler = () => {
    console.log('Edit Clicked');
    setMoreOptionVisible(false);
  };

  // Answer Delete Action
  const onDeleteHandler = () => {
    console.log('Delete Clicked');
    setMoreOptionVisible(false);
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
