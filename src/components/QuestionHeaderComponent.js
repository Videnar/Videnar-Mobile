import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import ProfileIcon from '../utilities/Icons/ProfileIcon';

const QuestionHeaderComponent = ({ userDisplayName }) => {
  return (
    <View style={styles.header}>
      <View style={styles.Profile}>
        <ProfileIcon size={15} />
        <Text style={styles.userName}>{userDisplayName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  Profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    paddingLeft: 5,
    letterSpacing: 1,
    fontSize: 14,
    color: GREY,
  },
});

export default React.memo(QuestionHeaderComponent);
