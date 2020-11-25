import React from 'react';
import {WebView} from 'react-native-webview';
import {Storage} from 'aws-amplify';

const Editor = (props) => {
  const content = props.content || '<p><br></p>';
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
                uploadToStorage = async pathToImageFile => {
  try {
    const response = await fetch(pathToImageFile)

    const blob = await response.blob()

    Storage.put('yourKeyHere.jpeg', blob, {
      contentType: 'image/jpeg',
    })
  } catch (err) {
    console.log(err)
  }
}


                var toolbarOptions = [[ 'bold', 'italic', { 'color': [] }, 'blockquote',  'code-block', 'image', 'video',{ header: 1 }, { header: 2 }, { 'list': 'ordered'}, { 'list': 'bullet' },{ 'script': 'sub'}, { 'script': 'super' }, 'link', 'formula', ],];
                var quill = new Quill('#editor', {
                  modules: {
                    toolbar: toolbarOptions
                  },
                  placeholder: 'Describe your question...',
                   theme: 'snow',
                   imageHandler: uploadToStorage
                  });
          quill.on('text-change', function(delta, oldDelta, source) {
                 window.ReactNativeWebView.postMessage(quill.root.innerHTML)
           });
    </script>`,
      }}
      onMessage={(event) => {
        const {data} = event.nativeEvent;
        props.setContent(data);
        // console.log(images);
      }}
      containerStyle={{ height: 100, width: 350 }}
    />
  );
};

export default Editor;
