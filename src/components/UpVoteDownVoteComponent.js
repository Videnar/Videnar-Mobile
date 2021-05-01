import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const UpVoteDownVoteComponent = ({ upVotes }) => {
  const [upVoteCount, setUpVoteCount] = useState(upVotes);
  const [isVoteClicked, setIsVoteClicked] = useState({
    upVote: false,
    downVote: false,
  });
  const [voteColor, setVoteColor] = useState({
    upVote: '#AAABAD',
    downVote: '#AAABAD',
  });

  //!UpVote DownVote Action
  const onVotePressHandler = (actionType, voteType) => {
    switch (actionType) {
      // If UP_VOTE is Pressed
      case 'upVote': {
        const prevUpVoteValue = isVoteClicked.upVote;
        const prevDownVoteValue = isVoteClicked.downVote;
        // Click Event is stored for Future Reference
        setIsVoteClicked({ upVote: !isVoteClicked.upVote, downVote: false });

        // If DownVote was true and UpVote is Clicked
        if (prevDownVoteValue && voteType && !prevUpVoteValue) {
          setUpVoteCount(upVoteCount + 2);
          setVoteColor({ upVote: '#F07D60', downVote: '#AAABAD' });
        } // if DownVote was false and UpVote is Clicked
        else if (!prevDownVoteValue && voteType && !prevUpVoteValue) {
          setUpVoteCount(upVoteCount + 1);
          setVoteColor({ upVote: '#F07D60', downVote: '#AAABAD' });
        } //if UpVote was true and Clicked then UpVote is Cancelled
        else if (voteType && prevUpVoteValue) {
          setUpVoteCount(upVoteCount - 1);
          setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
        }
        break;
      }
      // If DOWN_VOTE is Pressed
      case 'downVote': {
        const prevUpVoteValue = isVoteClicked.upVote;
        const prevDownVoteValue = isVoteClicked.downVote;
        // Click Event is stored for Future Reference
        setIsVoteClicked({ upVote: false, downVote: !isVoteClicked.downVote });

        // If UpVote was true and DownVote is Clicked
        if (prevUpVoteValue && !voteType && !prevDownVoteValue) {
          setUpVoteCount(upVoteCount - 2);
          setVoteColor({ upVote: '#AAABAD', downVote: '#F07D60' });
        } // If UpVote was false and DownVote is Clicked
        else if (!prevUpVoteValue && !voteType && !prevDownVoteValue) {
          setUpVoteCount(upVoteCount - 1);
          setVoteColor({ upVote: '#AAABAD', downVote: '#F07D60' });
        } // If DownVote was True and Clicked then DownVote is Cancelled
        else if (prevDownVoteValue && !voteType) {
          setUpVoteCount(upVoteCount + 1);
          setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
        }
        break;
      }
      default: {
        setVoteColor({ upVote: '#AAABAD', downVote: '#AAABAD' });
      }
    }
  };

  return (
    <>
      <Text style={styles.upVotes}>Upvotes: {upVoteCount}</Text>
      <View style={styles.vote}>
        {/**UpVote */}
        <Icon
          name="forward"
          type="material"
          size={28}
          color={voteColor.upVote}
          onPress={() => onVotePressHandler('upVote', true)}
          containerStyle={styles.upVote}
        />
        {/**DownVote */}
        <Icon
          name="forward"
          type="material"
          size={28}
          color={voteColor.downVote}
          onPress={() => onVotePressHandler('downVote', false)}
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
