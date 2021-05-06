import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';
import { AuthContext } from '../contexts/AuthContext';

const QuestionDetailBottomComponent = ({ question, questionId }) => {
  const {
    state: { userID },
  } = useContext(AuthContext);

  const [userUpVoteData, setUserUpVoteData] = useState();
  const [userUpVoteId, setUserUpVoteId] = useState();
  const [userVoteValue, setUserVoteValue] = useState({
    upVote: false,
    downVote: false,
  });

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
    checkuserExistsInUpVote();
  }, [questionId, userID]);

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
      <Text style={styles.tags}>#{question.tags}</Text>
      <UpVoteDownVoteComponent
        upVotes={question.upvotes}
        userVoteValue={userVoteValue}
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
