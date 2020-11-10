import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';

const AnswerComponent = ({answer}) => {
  const {title, content, view, upvotes, tags} = answer;
  return (
    <View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: content,
        }}
        style={{height: 100, width: 350}}
      />
      <View>
        <Text>Upvotes: {upvotes}</Text>
      </View>
    </View>
  );
};

export default AnswerComponent;
