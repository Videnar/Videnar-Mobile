import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {WebView} from 'react-native-webview';

const QuestionComponent = ({question, navigate}) => {
  const {title, content, view, upvotes, tags} = question;
  return (
    <TouchableHighlight
      onPress={() => {
        navigate && navigate('QuestionDetails', {question});
      }}>
      <View>
        <Text>{title}</Text>
        <WebView
          originWhitelist={['*']}
          source={{
            html: content,
          }}
          style={{height: 100, width: 350}}
        />
        <View>
          <Text>View: {view}</Text>
          <Text>Upvotes: {upvotes}</Text>
          <Text>{tags}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default QuestionComponent;
