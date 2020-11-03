import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {API, graphqlOperation} from 'aws-amplify';
import {createQuestion} from '../graphql/mutations';

class Editor extends Component {
  render() {
    const content = this.props.content || '<p><br></p>';
    return (
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<head>
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
                 <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                 </head>
                 <body>
                <div id="editor" style="width: auto; display: block;">${content}</div>
                </body>
                <script> var toolbarOptions = [['bold', 'italic','blockquote', 'code-block', 'image', { 'list': 'ordered'}, { 'list': 'bullet' },{ 'script': 'sub'}, { 'script': 'super' },{ 'color': [] },],];
                  var quill = new Quill('#editor', {
                  modules: {
                      toolbar: toolbarOptions
                  },
                   theme: 'snow'
                  });
          const content = JSON.stringify(quill.root.innerHTML);
          quill.on('text-change', function(delta, oldDelta, source) {
                 window.ReactNativeWebView.postMessage(JSON.stringify(quill.root.innerHTML))
});
                  </script>`,
        }}
        onMessage={(event) => {
          this.props.setQuestionBody(event.nativeEvent.data);
        }}
        style={{height: 100, width: 350}}
      />
    );
  }
}

export default Editor;
