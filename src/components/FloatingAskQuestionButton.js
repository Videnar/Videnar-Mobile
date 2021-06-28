import React from 'react';
import { FAB } from 'react-native-elements';
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
      title="Ask 🦉"
      color={DEEP_GREEN}
    />
  );
};

export default FloatingAskQuestionButton;
