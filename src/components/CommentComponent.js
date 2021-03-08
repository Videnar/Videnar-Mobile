import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Icon, Button, Text, Body } from 'native-base';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const CommentComponent = ({ id, comment, updateComment, deleteComment }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(comment);
  }, [comment]);

  const deleteSelectedComment = () => {
    deleteComment(id);
    setPopupVisible(false);
  };

  return (
    <View>
      {!enableEdit ? (
        <>
          <Body>
            <Text>{input}</Text>
          </Body>
          <Icon
            name="ellipsis-h"
            type="FontAwesome"
            onPress={() => {
              setPopupVisible(true);
            }}
          />
        </>
      ) : (
        <>
          <TextInput onChangeText={(text) => setInput(text)} value={input} />
          <Button
            primary
            onPress={() => {
              setEnableEdit(false);
            }}>
            <Text> Cancel </Text>
          </Button>
          <Button
            primary
            onPress={() => {
              updateComment(id, input);
              setEnableEdit(false);
            }}>
            <Text> Update </Text>
          </Button>
        </>
      )}
      <Dialog
        visible={popupVisible}
        onTouchOutside={() => {
          setPopupVisible(false);
        }}>
        <DialogContent>
          <Pressable
            onPress={() => {
              setPopupVisible(false);
              setEnableEdit(true);
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable onPress={deleteSelectedComment} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: '#85898f',
    textAlign: 'right',
  },
});

export default CommentComponent;
