import React, { useContext, useState } from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { API } from 'aws-amplify';
import { Card, Text, Icon, Overlay } from 'react-native-elements';
import Share from 'react-native-share';
import { deleteQuestion } from '../graphql/mutations';
import { AuthContext } from '../contexts/AuthContext';

const WIDTH = Dimensions.get('window').width;

const QuestionComponent = ({ question, navigation: { navigate, goBack } }) => {
  const route = useRoute();
  const {
    state: { username },
  } = useContext(AuthContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const { id, content, upvotes, tags } = question;

  const toggleOverlay = () => {
    setPopupVisible(!popupVisible);
  };

  const shareQuestionHandler = () => {
    const options = {
      message: 'Can you answer this Question',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
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
      <Card containerStyle={styles.Card}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.Profile}>
            <Icon name="person" type="material" iconStyle={styles.image} />
            <Text>Jyotiranjan Sahoo</Text>
          </View>
          <Text h6>20 April 2021</Text>
        </View>
        <Card.Divider />
        {/* Question Asked */}
        <View>
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
        </View>
        <Card.Divider />
        {/* Interactivity Section */}
        <View style={styles.Options}>
          <Text style={styles.tags}>#{tags}</Text>
          <Text style={styles.footerText}>Upvotes: {upvotes}</Text>
          <Icon
            name="share"
            type="material"
            color="grey"
            onPress={shareQuestionHandler}
          />
          {question.username === username && (
            <Icon
              name="more-vert"
              type="material"
              color="grey"
              onPress={() => {
                setPopupVisible(true);
              }}
            />
          )}
        </View>
      </Card>
      {/* Edit Delete actions */}
      <Overlay
        isVisible={popupVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlayStyle}
        backdropStyle={styles.backdropStyle}>
        <Pressable onPress={editQuestion} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
        <Card.Divider />
        <Pressable onPress={deleteSelectedQuestion} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </Overlay>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Options: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 18,
  },
  WebView: {
    width: 'auto',
    height: 50,
  },
  footerText: {
    color: 'orange',
    textAlign: 'right',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  Profile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    paddingRight: 5,
    color: 'grey',
  },
  Card: {
    borderRadius: 10,
    elevation: 4,
  },
  tags: {
    color: '#FF303A',
  },
  button: {
    height: 25,
    width: WIDTH * 0.5,
    margin: 5,
    alignItems: 'center',
  },
  overlayStyle: {
    borderRadius: 5,
    elevation: 50,
  },
  backdropStyle: {
    backgroundColor: 'transparent',
  },
});

export default QuestionComponent;
