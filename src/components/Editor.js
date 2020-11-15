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
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
                 <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                 </head>
                 <div id="editor"></div>
                 <body>
                <div id="editor" >${content}</div>
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
          quill.on('text-change', function(delta, oldDelta, source) {
                 window.ReactNativeWebView.postMessage(quill.root.innerHTML)
           });
                  </script>`,
        }}
        onMessage={(event) => {
          this.props.setContent(event.nativeEvent.data);
        }}
        containerStyle={{height: 100, width: 350}}
      />
    );
  }
}

export default Editor;
