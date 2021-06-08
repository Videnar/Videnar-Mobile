import React from 'react';
import { FAB, Icon } from 'react-native-elements';
import { ORANGE } from '../assets/colors/colors';

const FloatingAskQuestionButton = ({ navigation }) => {
  return (
    <FAB
      placement="right"
      size="large"
      onPress={() => {
        navigation.navigate('EditorScreen', { functionName: 'submitQuestion' });
      }}
      icon={
        <Icon
          type="material"
          name="live-help"
          color={ORANGE}
          size={28}
          reverse
          raised
        />
      }
    />
  );
};

export default FloatingAskQuestionButton;
