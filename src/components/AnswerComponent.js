import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Card, Divider, Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import ProfileIcon from '../utilities/Icons/ProfileIcon';
import AnswerBottomComponent from './AnswerBottomComponent';
import MomentAgo from './MomentAgo';

const AnswerComponent = ({ answer, questionId, route, navigation }) => {
  const ANSWER_HTML_ELEMENT = `<head>
                                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                              </head>
                              <body 
                                style="
                                text-align:auto; 
                                letter-spacing:0.5; 
                                font-size: 1.075rem;
                                color: black">
                                <div>${answer.content}</div>
                              </body>`;

  return (
    <Card containerStyle={styles.card}>
      <Pressable
        onPress={() => {
          route.name !== 'QuestionDetails' &&
            navigation.navigate('QuestionDetails', { questionID: questionId });
        }}>
        <View style={styles.header}>
          <View style={styles.user}>
            <ProfileIcon size={14} />
            <Text style={styles.userName}>{answer.userDisplayName}</Text>
          </View>
          <View>
            <MomentAgo createdAt={answer.createdAt} />
          </View>
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
      </Pressable>
      <AnswerBottomComponent answer={answer} questionId={questionId} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 0,
    marginVertical: 5,
  },
  WebView: {
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 15,
    width: '95%',
  },
  header: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  user: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    color: GREY,
    paddingHorizontal: 5,
    letterSpacing: 0.5,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});

export default AnswerComponent;
