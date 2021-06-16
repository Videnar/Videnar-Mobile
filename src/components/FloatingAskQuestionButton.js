import React from 'react';
import { FAB, Icon } from 'react-native-elements';
import { DEEP_GREEN } from '../assets/colors/colors';

const FloatingAskQuestionButton = ({ navigation }) => {
  return (
    <FAB
      placement="right"
      size="large"
      onPress={() => {
        navigation.navigate('EditorScreen', {
          functionName: 'submitQuestion',
          headerText: 'Ask a Question',
        });
      }}
      icon={
        <Icon
          type="material"
          name="live-help"
          color={DEEP_GREEN}
          size={28}
          reverse
          raised
        />
      }
    />
  );
};

export default FloatingAskQuestionButton;
