import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Icon, Text } from 'react-native-elements';
import WebView from 'react-native-webview';
import AnswerMoreOptionComponent from './AnswerMoreOptionComponent';
import CommentsComponent from './CommentsComponent';
import UpVoteDownVoteComponent from './UpVoteDownVoteComponent';

const IndividualAnswerComponent = ({ content }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Icon name="person" type="material" color="grey" />
          <Text style={styles.userName}>Jyotiranjan Sahoo</Text>
        </View>
        {/** More Options component */}
        <AnswerMoreOptionComponent />
      </View>
      {/** Description of the Answer */}
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
        style={styles.WebView}
      />
      <Divider />
      {/** Bottom Component for Answer - Upvote, Answer Approval */}
      <View style={styles.bottomContainer}>
        <View style={styles.feedBackContainer}>
          <Icon type="material" name="history" size={16} />
          <Text style={styles.feedBackText}>Pending</Text>
        </View>
        <UpVoteDownVoteComponent upVotes={0} />
      </View>
      {/** Comments on Answers */}
      <CommentsComponent headerText="Comments" />
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
    width: 'auto',
    height: 50,
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
    fontSize: 15,
    paddingHorizontal: 5,
  },
  feedBackContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  feedBackText: {
    paddingLeft: 3,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default IndividualAnswerComponent;
