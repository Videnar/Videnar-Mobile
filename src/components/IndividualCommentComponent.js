import React, { useContext, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, Icon, Overlay, Divider } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';

const IndividualCommentComponent = ({ comment, feedBack }) => {
  const {
    state: { userID },
  } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);

  const onEditHandler = () => {
    console.log('Edit Clicked');
    setIsVisible(false);
    feedBack(comment.id, 'Edit');
  };

  const onDeleteHandler = () => {
    console.log('Delete Clicked');
    setIsVisible(false);
    feedBack(comment.id, 'Delete');
  };

  return (
    <>
      {/** User Detail */}
      <Text style={styles.userName}>{comment.userDisplayName}</Text>
      <Pressable
        onLongPress={() => comment.userID === userID && setIsVisible(true)}>
        <Card containerStyle={styles.comment}>
          {/** Comment content */}
          <Text style={styles.commentText}>{comment.content}</Text>
        </Card>
      </Pressable>
      {/** Edit and Delete Buttons */}
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropStyle={styles.backdrop}
        overlayStyle={styles.overlay}>
        <Pressable onPress={onEditHandler} style={styles.button}>
          <View>
            <Text style={styles.optionText}>Edit</Text>
          </View>
          <View>
            <Icon type="material" name="edit" color={GREY} />
          </View>
        </Pressable>
        <Divider />
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    marginLeft: 12,
    marginTop: 8,
    color: GREY,
  },
  comment: {
    width: '83%',
    backgroundColor: '#F1F3F6',
    borderRadius: 5,
    marginLeft: 30,
    marginTop: 5,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  commentText: {
    letterSpacing: 1,
    fontSize: 15,
  },
  overlay: {
    borderRadius: 5,
    elevation: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionText: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '700',
    color: GREY,
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
});

export default IndividualCommentComponent;
