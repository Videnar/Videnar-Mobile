import React, { useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { v4 as uuid } from 'uuid';
import { Storage } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import { createQuestion, updateQuestion } from '../graphql/mutations';
import { AuthContext } from '../contexts/AuthContext';
import config from '../../aws-exports';
import { navigate } from '../navigation/RootNavigation';

const { aws_user_files_s3_bucket: bucket } = config;
const deviceWidth = Dimensions.get('window').width;

const Editor = ({ navigation, webref, setWebref, oldContent, questionID }) => {
  const {
    state: { username },
  } = useContext(AuthContext);
  const defaultContent = '<p><br></p>';

  const uploadToStorage = async (imageData) => {
    const { uri, fileName, type } = imageData;
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const key = `${uuid()}-${uuid()}-${fileName}`;

      Storage.put(key, blob, {
        contentType: type,
      });
      const url = `https://${bucket}.s3.amazonaws.com/public/${key}`;
    } catch (err) {
      console.log('error uploading image', err);
    }
  };

  const submitQuestion = async (str) => {
    if (oldContent) {
      updateSelectedQuestion(str);
    }
    try {
      await API.graphql(
        graphqlOperation(createQuestion, {
          input: {
            username,
            content: str,
            upvotes: 0,
            view: 0,
            tags: 'neet',
            noOfBookmarks: 0,
          },
        }),
      );
      navigate('Home');
    } catch (err) {
      console.log('error creating Question:', err);
    }
  };

  const updateSelectedQuestion = async (str) => {
    try {
      await API.graphql({
        query: updateQuestion,
        variables: {
          input: {
            id: questionID,
            content: str,
          },
        },
      });
      navigate('Home');
    } catch (err) {
      console.log('error updating Question:', err);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} scrollEnabled={false}>
      <WebView
        style={styles.webView}
        originWhitelist={['*']}
        ref={(r) => setWebref(r)}
        javaScriptEnabled={true}
        source={{
          html: `<head>
                  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
                  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                 </head>
                 <body style="background-color:#fff8f8;">
                  <div id="editor" >${oldContent || defaultContent}</div>
                 </body>
                 <script> 
                  var toolbarOptions = [[ 'bold', 'italic', { 'color': [] }, 'blockquote',  'code-block', 'image', 'video',{ header: 1 }, { header: 2 }, { 'list': 'ordered'}, { 'list': 'bullet' },{ 'script': 'sub'}, { 'script': 'super' }, 'link', 'formula', ],];
                  var quill = new Quill('#editor', {
                  modules: {
                    toolbar: toolbarOptions
                  },
                  placeholder: 'Describe your question...',
                   theme: 'snow'
                  });
                </script>`,
        }}
        onMessage={async (event) => {
          const { data } = event.nativeEvent;
          if (data !== defaultContent) {
            submitQuestion(data);
          }
        }}
        containerStyle={styles.webview}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    margin: 'auto',
  },
  webView: { width: deviceWidth },
  button: {
    width: 250,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#3740ff',
  },
});

export default Editor;
