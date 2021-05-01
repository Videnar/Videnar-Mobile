import React, { useEffect, useState } from 'react';
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

const WIDTH = Dimensions.get('window').width;

const CommentsComponent = ({ headerText, userName, userId, questionId }) => {
  // OverLay Visible?
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  // New Comment text Input
  const [newComment, setNewComment] = useState('');
  const [placeholder, setPlaceholder] = useState('Comment Here...');

  const [commentArray, setCommentArray] = useState([
    {
      content: '',
      userDisplayName: '',
      userID: '',
      questionID: questionId,
    },
  ]);

  // Fetching All Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('comments')
          .onSnapshot((querySnapshot) => {
            const comnts = [];
            querySnapshot.forEach((documentSnapshot) => {
              comnts.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setCommentArray(comnts);
          });
      } catch (err) {
        console.log('error fetching commentsOnQuestion', err);
      }
    };
    fetchComments();
  });

  // Posting New Comments
  const onNewCommentPostHandler = () => {
    console.log(newComment);
    if (newComment !== '') {
      console.log('Passed');
      setCommentArray([
        {
          id: Math.random() + '',
          userDisplayName: userName,
          comment: newComment,
        },
        ...commentArray,
      ]);
      setNewComment('');
    } else {
      setPlaceholder('Please write something!');
    }
  };

  // Delete and Edit Actions
  const onModifyAction = (id, action) => {
    switch (action) {
      case 'Edit': {
        const commentToModify = commentArray.filter((item) => item.id === id);
        const newCommentArray = commentArray.filter((item) => item.id !== id);
        setCommentArray(newCommentArray);
        setNewComment(commentToModify[0].comment);
        break;
      }
      case 'Delete': {
        const newCommentArray = commentArray.filter((item) => item.id !== id);
        setCommentArray(newCommentArray);
        break;
      }
      default:
        console.log('Something Wrong');
    }
  };

  // Individual Comment Items
  const commentItem = ({ item }) => {
    return (
      <IndividualCommentComponent
        item={item}
        feedBack={(id, action) => onModifyAction(id, action)}
      />
    );
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsCommentsVisible(true)}>
        <Icon type="maaterial" name="chat-bubble" color="#595654" />
        <Text style={styles.text}>
          {headerText} ({commentArray.length}){' '}
        </Text>
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
              text: headerText,
              style: styles.headerText,
            }}
            backgroundColor="white"
          />
          {/** Comments List */}
          <FlatList
            data={commentArray}
            renderItem={commentItem}
            keyExtractor={(item) => item.id}
          />
          {/** Input Text for new Comment */}
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={placeholder}
              multiline
              style={styles.textInput}
              value={newComment}
              onChangeText={(text) => {
                console.log(text);
                return setNewComment(text);
              }}
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

export default CommentsComponent;
