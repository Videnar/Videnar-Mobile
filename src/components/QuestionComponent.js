import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {Icon, Card, CardItem, Text} from 'native-base';

const QuestionComponent = ({question, navigate}) => {
  const {content, view, upvotes, tags} = question;

  return (
    <TouchableOpacity
      onPress={() => {
        navigate && navigate('QuestionDetails', {question});
      }}>
      <Card>
        <CardItem cardBody bordered>
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
        </CardItem>
        <CardItem style={{flex: 1, justifyContent: 'space-around'}}>
          <Text style={{color: '#cf391b'}}>{tags}</Text>
          <Text style={styles.footerText}>Views: {view}</Text>
          <Text style={styles.footerText}>Upvotes: {upvotes}</Text>
          <Icon name="caret-up" type="FontAwesome" />
          <Icon name="caret-down" type="FontAwesome" />
          <Icon name="ellipsis-h" type="FontAwesome" />
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: '#85898f',
    textAlign: 'right',
  },
});

export default QuestionComponent;
