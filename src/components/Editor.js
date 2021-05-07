import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const deviceWidth = Dimensions.get('window').width;

const Editor = ({ navigation, webref, setWebref, oldContent, submit }) => {
  const defaultContent = '<p><br></p>';
  const [content, setContent] = useState(defaultContent);

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
                 <body style="background-color:white;">
                  <div id="editor" >${oldContent || content}</div>
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
                   quill.getModule('toolbar').addHandler('image', () => {
                   window.ReactNativeWebView.postMessage('image');
                  });
                </script>`,
        }}
        onMessage={async (event) => {
          const { data } = event.nativeEvent;
          if (data !== defaultContent) {
            submit(data);
            setContent(defaultContent);
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
  webView: {
    width: deviceWidth,
    height: 300,
  },
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
