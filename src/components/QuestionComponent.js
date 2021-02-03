import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { API } from 'aws-amplify';
import { Icon, Card, CardItem, Text } from 'native-base';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { updateQuestion, deleteQuestion } from '../graphql/mutations';
import * as RootNavigation from '../navigation/RootNavigation';

const QuestionComponent = ({ question, navigate }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const { id, content, view, upvotes, tags } = question;

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
    RootNavigation.navigate('AskQuestion', { id, content, tags });
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
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigate && navigate('QuestionDetails', { question });
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
          <Text style={styles.footerText}>Views: {view}</Text>
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
          <Icon
            name="ellipsis-h"
            type="FontAwesome"
            onPress={() => {
              setPopupVisible(true);
            }}
          />
        </CardItem>
      </Card>
      <Dialog
        visible={popupVisible}
        onTouchOutside={() => {
          setPopupVisible(false);
        }}>
        <DialogContent>
          <TouchableOpacity onPress={editQuestion} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={deleteSelectedQuestion}
            style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
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
