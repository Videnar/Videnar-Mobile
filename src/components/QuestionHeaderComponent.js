import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const QuestionHeaderComponent = () => {
  return (
    <View style={styles.header}>
      <View style={styles.Profile}>
        <Icon name="person" type="material" iconStyle={styles.image} />
        <Text>Jyotiranjan Sahoo</Text>
      </View>
      <Text h6>20 April 2021</Text>
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
    color: 'grey',
  },
});

export default QuestionHeaderComponent;
