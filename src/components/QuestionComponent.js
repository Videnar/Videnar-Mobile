import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { API } from 'aws-amplify';
import { Icon, Card, CardItem, Text } from 'native-base';
import { updateQuestion, deleteQuestion } from '../graphql/mutations';
import ActionDialog from './ActionDialog';
import { AuthContext } from '../contexts/AuthContext';

const QuestionComponent = ({ question, navigation: { navigate, goBack } }) => {
  const route = useRoute();
  const {
    state: { username },
  } = useContext(AuthContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const { id, content, upvotes, tags } = question;

  const updateUpvote = async (n) => {
    try {
      await API.graphql({
        query: updateQuestion,
        variables: {
          input: {
            id,
            upvotes: upvotes + n,
          },
        },
      });
    } catch (err) {
      console.log('error updating Question:', err);
    }
  };

  const editQuestion = () => {
    setPopupVisible(false);
    navigate('AskQuestion', { id, content, tags });
  };

  const deleteSelectedQuestion = async () => {
    try {
      await API.graphql({
        query: deleteQuestion,
        variables: {
          input: { id },
        },
      });
    } catch (err) {
      console.log('error deleting Question:', err);
    }
    setPopupVisible(false);
    route.name === 'QuestionDetails' && goBack();
  };

  return (
    <Pressable
      onPress={() => {
        route.name !== 'QuestionDetails' &&
          navigate('QuestionDetails', { questionID: question.id });
      }}>
      <Card>
        <CardItem>
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
            style={{ width: 'auto', height: 400 }}
          />
        </CardItem>
        <CardItem style={{ flex: 1, justifyContent: 'space-around' }}>
          <Text style={{ color: '#cf391b' }}>{tags}</Text>
          {/* <Text style={styles.footerText}>Views: {view}</Text> */}
          <Text style={styles.footerText}>Upvotes: {upvotes}</Text>
          <Icon
            name="caret-up"
            type="FontAwesome"
            onPress={() => {
              updateUpvote(1);
            }}
          />
          <Icon
            name="caret-down"
            type="FontAwesome"
            onPress={() => {
              updateUpvote(-1);
            }}
          />
          {question.username === username && (
            <Icon
              name="ellipsis-h"
              type="FontAwesome"
              onPress={() => {
                setPopupVisible(true);
              }}
            />
          )}
        </CardItem>
      </Card>
      <ActionDialog
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        editItem={editQuestion}
        deleteItem={deleteSelectedQuestion}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: '#85898f',
    textAlign: 'right',
  },
});

export default QuestionComponent;
