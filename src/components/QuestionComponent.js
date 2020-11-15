import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

const QuestionComponent = ({question, navigate}) => {
  const {title, content, view, upvotes, tags} = question;
  return (
    <TouchableOpacity
      onPress={() => {
        navigate && navigate('QuestionDetails', {question});
      }}>
      <View>
        <Text>{title}</Text>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `<head>
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                 </head>
                 <body >
                <div>${content}</div>
                </body>`,
          }}
          style={{height: 100, width: 350}}
        />
        <View>
          <Text>View: {view}</Text>
          <Text>Upvotes: {upvotes}</Text>
          <Text>{tags}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionComponent;
