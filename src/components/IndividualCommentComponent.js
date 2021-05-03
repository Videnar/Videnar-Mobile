import React, { useState } from 'react';
import { Dimensions, View, StyleSheet, Pressable } from 'react-native';
import { Card, Text, Icon, Overlay, Divider } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;

const IndividualCommentComponent = ({ item, feedBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onEditHandler = () => {
    console.log('Edit Clicked');
    setIsVisible(false);
    feedBack(item.id, 'Edit');
  };

  const onDeleteHandler = () => {
    console.log('Delete Clicked');
    setIsVisible(false);
    feedBack(item.id, 'Delete');
  };

  return (
    <>
      {/** User Detail */}
      <Text style={styles.userName}>{item.userDisplayName}</Text>
      <Card containerStyle={styles.comment}>
        {/**More Options Button */}
        <View style={styles.iconPress}>
          <Icon
            type="material"
            name="expand-more"
            onPress={() => setIsVisible(true)}
          />
        </View>
        {/** Comment content */}
        <Text style={styles.commentText}>{item.content}</Text>
      </Card>
      {/** Edit and Delete Buttons */}
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropStyle={styles.backdrop}
        overlayStyle={styles.overlay}>
        <Pressable onPress={onEditHandler}>
          <Text style={styles.optionText}>Edit</Text>
        </Pressable>
        <Divider />
        <Pressable onPress={onDeleteHandler}>
          <Text style={styles.optionText}>Delete</Text>
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
    marginTop: 18,
  },
  comment: {
    width: WIDTH * 0.75,
    backgroundColor: '#DFDFDF',
    borderRadius: 10,
    marginLeft: 30,
    marginTop: 5,
    elevation: 2,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  commentText: {
    letterSpacing: 0.5,
    fontSize: 14,
  },
  iconPress: {
    width: WIDTH * 0.68,
    bottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  overlay: {
    width: 150,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  optionText: {
    margin: 5,
  },
});

export default IndividualCommentComponent;
