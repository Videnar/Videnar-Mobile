import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';
import { Context } from '../contexts';

const QuestionDetailBottomComponent = ({ question, questionId }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const [userUpVoteData, setUserUpVoteData] = useState();
  const [userUpVoteId, setUserUpVoteId] = useState();
  const [userVoteValue, setUserVoteValue] = useState({
    upVote: false,
    downVote: false,
  });
  const [upVoteEditable, setUpVoteEditable] = useState(false);

  const [userExistsInUpVote, setUserExistsInUpVote] = useState(false);

  useEffect(() => {
    const checkuserExistsInUpVote = async () => {
      const upvotesRef = await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('upvotes');

      const upVoteSnapshot = await upvotesRef
        .where('userId', '==', userID)
        .get();
      await upVoteSnapshot.forEach((doc) => {
        setUserUpVoteData(doc.data());
        setUserUpVoteId(doc.id);
        setUserExistsInUpVote(true);

        if (doc.data().voteType === 'Up') {
          setUserVoteValue({
            upVote: true,
            downVote: false,
          });
        } else if (doc.data().voteType === 'Down') {
          setUserVoteValue({
            upVote: false,
            downVote: true,
          });
        }
      });
    };
    if (question.userID === userID) {
      setUpVoteEditable(false);
    } else {
      checkuserExistsInUpVote();
      setUpVoteEditable(true);
    }
  }, [questionId, userID, question.userID]);

  const updateUpvoteCountHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .update({
        ...question,
        upvotes: count,
      });
  };

  const addUpvoteData = async (voteType) => {
    if (userExistsInUpVote) {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('upvotes')
        .doc(userUpVoteId)
        .update({
          ...userUpVoteData,
          voteType: voteType,
        });
    } else {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('upvotes')
        .add({
          userId: userID,
          voteType: voteType,
        });
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.tags}>#{question.tags}</Text> */}
      <UpVoteDownVoteComponent
        upVotes={question.upvotes}
        userVoteValue={userVoteValue}
        upVoteEditable={upVoteEditable}
        updateUpvote={(count) => updateUpvoteCountHandler(count)}
        addUpvoteData={(voteType) => addUpvoteData(voteType)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-around',
  },
});

export default QuestionDetailBottomComponent;
