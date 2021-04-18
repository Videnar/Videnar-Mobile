import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

const FloatingAskQuestionButton = ({ navigation }) => {
  return (
    <>
      <Pressable
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate('AskQuestion');
        }}
        style={styles.touchable}>
        <Icon
          type="material"
          name="live-help"
          color="#F07D60"
          size={28}
          reverse
          raised
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  touchable: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 25,
  },
});

export default FloatingAskQuestionButton;
