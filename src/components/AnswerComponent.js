import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Card, Divider, Icon, Text } from 'react-native-elements';
import { Context } from '../contexts';
import AnswerBottomComponent from './AnswerBottomComponent';
import AnswerMoreOptionComponent from './AnswerMoreOptionComponent';
import CommentsonAnswerComponent from './CommentsonAnswerComponent';

const AnswerComponent = ({ answer, questionId }) => {
  const {
    state: { userID },
  } = useContext(Context);

  const ANSWER_HTML_ELEMENT = `<head>
                                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                              </head>
                              <body >
                                <div>${answer.content}</div>
                              </body>`;

  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Icon name="person" type="material" color="grey" size={22} />
          <Text style={styles.userName}>{answer.userDisplayName}</Text>
        </View>
        {/** More Options component */}
        {userID === answer.userID ? (
          <AnswerMoreOptionComponent
            answerId={answer.id}
            answerContent={answer.content}
            questionId={questionId}
          />
        ) : (
          <></>
        )}
      </View>
      {/**Answer Description */}
      <AutoHeightWebView
        originWhitelist={['*']}
        source={{
          html: ANSWER_HTML_ELEMENT,
        }}
        style={styles.WebView}
      />
      <Divider />
      <AnswerBottomComponent answer={answer} questionId={questionId} />
      <CommentsonAnswerComponent questionId={questionId} answerId={answer.id} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  WebView: {
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  header: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    paddingHorizontal: 5,
    letterSpacing: 0.5,
  },
});

export default AnswerComponent;
