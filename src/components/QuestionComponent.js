import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          style={{width: 'auto', height: 200}}
        />
        <View>
          <Text>View: {view}</Text>
          <Text>Upvotes: {upvotes}</Text>
          <Text>{tags}</Text>
        </View>
        <MaterialIcons name="more-horiz" color={'#e91e63'} size={32} />
        <MaterialIcons name="arrow-drop-up" color={'#e91e63'} size={48} />
        <MaterialIcons name="arrow-drop-down" color={'#e91e63'} size={48} />
      </View>
    </TouchableOpacity>
  );
};

export default QuestionComponent;
