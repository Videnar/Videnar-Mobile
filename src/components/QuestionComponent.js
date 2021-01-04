import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Icon, CardItem } from 'native-base'

const QuestionComponent = ({ question, navigate }) => {
  const { title, content, view, upvotes, tags } = question;

  return (
    <TouchableOpacity
      onPress={() => {
        navigate && navigate('QuestionDetails', { question });
      }}>
      <View>
        <CardItem>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
        </CardItem>
        <CardItem cardBody>
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
            style={{ width: 'auto', height: 200 }}
          />
        </CardItem>
        <CardItem>
          <Text>View: {view}</Text>
          <Text>Upvotes: {upvotes}</Text>
          <Text>{tags}</Text>
        </CardItem>
        <CardItem>
          <Icon name='caret-up' type='FontAwesome' />
          <Icon name='caret-down' type='FontAwesome' />
          <Icon name='ellipsis-h' type='FontAwesome' />
        </CardItem>
      </View>
    </TouchableOpacity>
  );
};

export default QuestionComponent;
