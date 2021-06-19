import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { StyleSheet, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';
import { Context } from '../contexts';

const QuestionDetailBottomComponent = ({ question, questionId }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const [userUpVoteData, setUserUpVoteData] = useState('');
  const upVoteIdRef = useRef('');
  const [userVoteValue, setUserVoteValue] = useState({
    upVote: false,
    downVote: false,
  });
  const [upVoteEditable, setUpVoteEditable] = useState(false);

  const [userExistsInUpVote, setUserExistsInUpVote] = useState(false);

  useEffect(() => {
    if (question.userID === userID) {
      setUpVoteEditable(false);
    } else {
      checkuserExistsInUpVote();
      setUpVoteEditable(true);
    }
    return () => {
      setUserUpVoteData({});
    };
  }, [userID, question.userID, checkuserExistsInUpVote]);

  const checkuserExistsInUpVote = useCallback(async () => {
    const upvotesRef = await firestore()
      .collection('questions')
      .doc(questionId)
      .collection('upvotes');

    const upVoteSnapshot = await upvotesRef.where('userId', '==', userID).get();
    await upVoteSnapshot.forEach((doc) => {
      setUserUpVoteData(doc.data());
      upVoteIdRef.current = doc.id;
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
  }, [questionId, userID]);

  const updateUpvoteCountHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .update({
        ...question,
        upvotes: count,
        updatedAt: firestore.Timestamp.now(),
      });
  };

  const addUpvoteData = async (voteType) => {
    if (userExistsInUpVote) {
      if (voteType === '') {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('upvotes')
          .doc(upVoteIdRef.current)
          .delete();
        setUserExistsInUpVote(false);
      } else {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('upvotes')
          .doc(upVoteIdRef.current)
          .update({
            ...userUpVoteData,
            voteType: voteType,
            updatedAt: firestore.Timestamp.now(),
          });
      }
    } else {
      await firestore()
        .collection('questions')
        .doc(questionId)
        .collection('upvotes')
        .add({
          userId: userID,
          voteType: voteType,
          createdAt: firestore.Timestamp.now(),
        });
    }
    checkuserExistsInUpVote();
  };

  return (
    <View style={styles.container}>
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
