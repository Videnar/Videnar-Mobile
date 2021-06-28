import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';

const QuestionHeaderComponent = ({ userDisplayName }) => {
  return (
    <View style={styles.header}>
      <View style={styles.Profile}>
        <Icon name="person" type="material" iconStyle={styles.image} />
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
  },
  Profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    paddingRight: 5,
    color: GREY,
  },
  userName: {
    letterSpacing: 1,
    fontSize: 16,
    color: GREY,
  },
});

export default React.memo(QuestionHeaderComponent);
