import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';
import { Context } from '../contexts';

const AnswerBottomComponent = ({ answer, questionId }) => {
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
        .collection('answers')
        .doc(answer.id)
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
    return () => {
      if (answer.userID === userID) {
        setUpVoteEditable(false);
      } else {
        checkuserExistsInUpVote();
        setUpVoteEditable(true);
      }
    };
  }, [questionId, answer.id, userID, answer.userID]);

  const updateUpvoteCountHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .collection('answers')
      .doc(answer.id)
      .update({
        ...answer,
        upvotes: count,
      });
  };

  const addUpvoteData = async (voteType) => {
    if (userExistsInUpVote) {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('answers')
        .doc(answer.id)
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
        .collection('answers')
        .doc(answer.id)
        .collection('upvotes')
        .add({
          userId: userID,
          voteType: voteType,
        });
    }
  };

  return (
    <View style={styles.bottomContainer}>
      {/** Answer Approval */}
      <View style={styles.feedBackContainer}>
        <Icon type="material" name="history" size={16} />
        <Text style={styles.feedBackText}>Pending</Text>
      </View>
      <UpVoteDownVoteComponent
        upVotes={answer.upvotes}
        upVoteEditable={upVoteEditable}
        userVoteValue={userVoteValue}
        updateUpvote={(count) => updateUpvoteCountHandler(count)}
        addUpvoteData={(voteType) => addUpvoteData(voteType)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  feedBackContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  feedBackText: {
    paddingLeft: 3,
  },
});

export default AnswerBottomComponent;
