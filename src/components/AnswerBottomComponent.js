import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';
import { Context } from '../contexts';

const AnswerBottomComponent = ({ answer, questionId }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const [userUpVoteData, setUserUpVoteData] = useState({});
  const upVoteIdRef = useRef('');
  const [userVoteValue, setUserVoteValue] = useState({
    upVote: false,
    downVote: false,
  });
  const [upVoteEditable, setUpVoteEditable] = useState(false);

  const [userExistsInUpVote, setUserExistsInUpVote] = useState(false);

  useEffect(() => {
    if (answer.userID === userID) {
      setUpVoteEditable(false);
    } else {
      checkuserExistsInUpVote();
      setUpVoteEditable(true);
    }
    return () => {
      setUserUpVoteData({});
    };
  }, [userID, answer.userID, checkuserExistsInUpVote]);

  const checkuserExistsInUpVote = useCallback(async () => {
    try {
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
    } catch {
      console.log("Can't find from Database");
    }
  }, [questionId, answer.id, userID]);

  const updateUpvoteCountHandler = async (count) => {
    await firestore()
      .collection('questions')
      .doc(questionId)
      .collection('answers')
      .doc(answer.id)
      .update({
        ...answer,
        updatedAt: firestore.Timestamp.now(),
        upvotes: count,
      });
  };

  const addUpvoteData = async (voteType) => {
    if (userExistsInUpVote) {
      if (voteType === '') {
        try {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('answers')
            .doc(answer.id)
            .collection('upvotes')
            .doc(upVoteIdRef.current)
            .delete();
          setUserExistsInUpVote(false);
          setUserUpVoteData({});
          upVoteIdRef.current = '';
        } catch {
          console.log('Error while Deleting from upvotes');
        }
      } else {
        try {
          await firestore()
            .collection('questions')
            .doc(questionId)
            .collection('answers')
            .doc(answer.id)
            .collection('upvotes')
            .doc(upVoteIdRef.current)
            .update({
              ...userUpVoteData,
              updatedAt: firestore.Timestamp.now(),
              voteType: voteType,
            });
        } catch {
          console.log('Error while Updating in upvotes');
        }
      }
    } else {
      try {
        await firestore()
          .collection('questions')
          .doc(questionId)
          .collection('answers')
          .doc(answer.id)
          .collection('upvotes')
          .add({
            userId: userID,
            createdAt: firestore.Timestamp.now(),
            voteType: voteType,
          });
      } catch {
        console.log('Error while adding to upvotes');
      }
    }
    checkuserExistsInUpVote();
  };

  return (
    <View style={styles.bottomContainer}>
      {/** Answer Approval */}
      {/* <View style={styles.feedBackContainer}>
        <Icon type="material" name="history" size={16} />
        <Text style={styles.feedBackText}>Pending</Text>
      </View> */}
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
