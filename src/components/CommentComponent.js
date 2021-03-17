import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon, Button, Text, Body } from 'native-base';
import ActionDialog from './ActionDialog';
import { AuthContext } from '../contexts/AuthContext';

const CommentComponent = ({ id, comment, updateComment, deleteComment }) => {
  const {
    state: { username },
  } = useContext(AuthContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(comment.content);
  }, [comment.content]);

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
          {comment.username === username && (
            <Icon
              name="ellipsis-h"
              type="FontAwesome"
              onPress={() => {
                setPopupVisible(true);
              }}
            />
          )}
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
      <ActionDialog
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        editItem={() => {
          setPopupVisible(false);
          setEnableEdit(true);
        }}
        deleteItem={deleteSelectedComment}
      />
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
