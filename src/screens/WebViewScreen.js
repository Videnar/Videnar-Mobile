import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';

const AnswerComponent = () => {
  useEffect(() => {});

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: 'https://reactnative.dev/' }}
    />
  );
};

export default AnswerComponent;
