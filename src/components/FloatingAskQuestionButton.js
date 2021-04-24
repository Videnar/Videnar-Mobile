import React from 'react';
import { FAB, Icon } from 'react-native-elements';

const FloatingAskQuestionButton = ({ navigation }) => {
  return (
    <FAB
      placement="right"
      size="large"
      onPress={() => {
        navigation.navigate('AskQuestion');
      }}
      icon={
        <Icon
          type="material"
          name="live-help"
          color="#F07D60"
          size={28}
          reverse
          raised
        />
      }
    />
  );
};

export default FloatingAskQuestionButton;
