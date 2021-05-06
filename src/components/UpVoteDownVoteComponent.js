import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const UpVoteDownVoteComponent = ({
  upVotes,
  updateUpvote,
  addUpvoteData,
  userVoteValue,
}) => {
  const voteCountRef = useRef(upVotes);

  const [isVoteClicked, setIsVoteClicked] = useState({
    upVote: false,
    downVote: false,
  });
  const [voteColor, setVoteColor] = useState({
    upVote: '#AAABAD',
    downVote: '#AAABAD',
  });

  useEffect(() => {
    if (userVoteValue) {
      setIsVoteClicked({
        upVote: userVoteValue.upVote,
        downVote: userVoteValue.downVote,
      });
      setVoteColor({
        upVote: userVoteValue.upVote ? '#F07D60' : '#AAABAD',
        downVote: userVoteValue.downVote ? '#F07D60' : '#AAABAD',
      });
    }
  }, [userVoteValue]);

  const onVotePressHandler = (actionType) => {
    let voteType = '';

    switch (actionType) {
      case 'upVote': {
        const prevUpVoteValue = isVoteClicked.upVote;
        const prevDownVoteValue = isVoteClicked.downVote;

        if (!prevUpVoteValue && prevDownVoteValue) {
          voteCountRef.current = upVotes + 2;
          setVoteColor({ upVote: '#F07D60', downVote: '#AAABAD' });
          voteType = 'Up';
        } else if (!prevUpVoteValue && !prevDownVoteValue) {
          voteCountRef.current = upVotes + 1;
          setVoteColor({ upVote: '#F07D60', downVote: '#AAABAD' });
          voteType = 'Up';
        } else {
          voteCountRef.current = upVotes - 1;
          setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
        }

        setIsVoteClicked({ upVote: !isVoteClicked.upVote, downVote: false });
        break;
      }

      case 'downVote': {
        const prevUpVoteValue = isVoteClicked.upVote;
        const prevDownVoteValue = isVoteClicked.downVote;

        if (!prevDownVoteValue && prevUpVoteValue) {
          voteCountRef.current = upVotes - 2;
          setVoteColor({ upVote: '#AAABAD', downVote: '#F07D60' });
          voteType = 'Down';
        } else if (!prevDownVoteValue && !prevUpVoteValue) {
          voteCountRef.current = upVotes - 1;
          setVoteColor({ upVote: '#AAABAD', downVote: '#F07D60' });
          voteType = 'Down';
        } else {
          voteCountRef.current = upVotes + 1;
          setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
        }

        setIsVoteClicked({ upVote: false, downVote: !isVoteClicked.downVote });
        break;
      }
      default: {
        setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
      }
    }

    updateUpvote(voteCountRef.current);
    addUpvoteData(voteType);
  };

  return (
    <>
      <Text style={styles.upVotes}>Upvotes: {voteCountRef.current}</Text>
      <View style={styles.vote}>
        {/**UpVote */}
        <Icon
          name="forward"
          type="material"
          size={28}
          color={voteColor.upVote}
          onPress={() => onVotePressHandler('upVote')}
          containerStyle={styles.upVote}
        />
        {/**DownVote */}
        <Icon
          name="forward"
          type="material"
          size={28}
          color={voteColor.downVote}
          onPress={() => onVotePressHandler('downVote')}
          containerStyle={styles.downVote}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  vote: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  upVote: {
    transform: [{ rotate: '270deg' }],
  },
  downVote: {
    transform: [{ rotate: '90deg' }],
  },
});

export default UpVoteDownVoteComponent;
