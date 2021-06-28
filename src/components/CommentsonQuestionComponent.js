import React, { useCallback, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  View,
  TextInput,
} from 'react-native';
import { Header, Icon, Overlay, Text } from 'react-native-elements';
import IndividualCommentComponent from './IndividualCommentComponent';
import firestore from '@react-native-firebase/firestore';
import { GREY } from '../assets/colors/colors';

const WIDTH = Dimensions.get('window').width;

const CommentsonQuestionComponent = ({ userName, userId, questionId }) => {
  // OverLay Visible?
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  // New Comment text Input
  const [newComment, setNewComment] = useState('');
  const [placeholder, setPlaceholder] = useState('Comment Here...');

  const [commentArray, setCommentArray] = useState([]);

  const [isEdited, setIsEdited] = useState(false);

  const onOpenedCommentHandler = useCallback(() => {
    firestore()
      .collection('questions')
      .doc(questionId)
      .collection('comments')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const comnts = [];
        querySnapshot &&
          querySnapshot.forEach((documentSnapshot) => {
            comnts.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
        setCommentArray(comnts);
        setIsCommentsVisible(true);
      });
  }, [questionId]);

  // Posting New Comments
  const onNewCommentPostHandler = async () => {
    console.log(newComment);
    try {
      if (newComment !== '') {
        console.log('Passed');
        // Clearing the text Input
        setNewComment('');
        if (isEdited) {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('comments')
            .doc(isEdited.id)
            .update({
              content: newComment,
              updatedAt: firestore.Timestamp.now(),
            });
        } else {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('comments')
            .add({
              questionID: questionId,
              userDisplayName: userName,
              userID: userId,
              content: newComment,
              createdAt: firestore.Timestamp.now(),
            });
        }
      } else {
        setPlaceholder('Please write something!');
      }
      setIsEdited(false);
    } catch (err) {
      console.log(err);
      console.log('Error While Posting/Editing new Comments');
    }
  };

  // Delete and Edit Actions
  const onModifyAction = async (id, action) => {
    switch (action) {
      case 'Edit': {
        const commentToModify = commentArray.filter((item) => item.id === id);
        const newCommentArray = commentArray.filter((item) => item.id !== id);

        setCommentArray(newCommentArray);
        setNewComment(commentToModify[0].content);
        setIsEdited({ id: id });
        break;
      }
      case 'Delete': {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('comments')
          .doc(id)
          .delete();
        break;
      }
      default:
        console.log('Something is Wrong!');
    }
  };

  // Individual Comment Items
  const commentItem = ({ item }) => {
    return (
      <IndividualCommentComponent
        comment={item}
        feedBack={(id, action) => onModifyAction(id, action)}
      />
    );
  };

  return (
    <>
      {/** Pressable Comment Text with number of Comments populated */}
      <TouchableOpacity
        style={styles.container}
        onPress={onOpenedCommentHandler}>
        <Icon type="material" name="chat-bubble" color={GREY} />
        <Text style={styles.text}>Comments on Question</Text>
      </TouchableOpacity>
      {/**Comments Overlay */}
      <Overlay
        isVisible={isCommentsVisible}
        onBackdropPress={() => setIsCommentsVisible(false)}
        overlayStyle={styles.overLayContainer}>
        <View>
          <Header
            statusBarProps={{
              backgroundColor: 'white',
              barStyle: 'dark-content',
            }}
            leftComponent={
              <Icon
                type="material"
                name="arrow-back"
                onPress={() => setIsCommentsVisible(false)}
              />
            }
            centerComponent={{
              text: 'Comments on Question',
              style: styles.headerText,
            }}
            backgroundColor="white"
          />
          {/** Comments List */}
          <FlatList
            data={commentArray}
            renderItem={commentItem}
            keyExtractor={(item) => item.id}
            maxToRenderPerBatch={4}
            initialNumToRender={3}
            updateCellsBatchingPeriod={100}
          />
          {/** Input Text for new Comment */}
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={placeholder}
              multiline
              style={styles.textInput}
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
            />
            {/** Send Button */}
            <Icon
              type="material"
              name="send"
              size={37}
              color="grey"
              onPress={onNewCommentPostHandler}
            />
          </View>
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: 20,
    marginTop: 20,
  },
  text: {
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingLeft: 5,
    color: GREY,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#825399',
  },
  overLayContainer: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: WIDTH * 0.8,
    margin: 12,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 25,
  },
});

export default CommentsonQuestionComponent;
