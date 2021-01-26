import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {WebView} from 'react-native-webview';
import ImagePicker from 'react-native-image-picker';
import {v4 as uuid} from 'uuid';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {Storage} from 'aws-amplify';
import config from '../../aws-exports';

const {aws_user_files_s3_bucket: bucket} = config;

const Editor = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [content, setContent] = useState('<p><br></p>');
  const [webref, setWebref] = useState();

  useEffect(() => {
    if (props.content !== content) {
      setContent(props.content);
    }
  }, [content, props.content]);

  const uploadToStorage = async (imageData) => {
    const {uri, fileName, type} = imageData;
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const key = `${uuid()}-${uuid()}-${fileName}`;

      Storage.put(key, blob, {
        contentType: type,
      });
      const url = `https://${bucket}.s3.amazonaws.com/public/${key}`;
      const run = `
      let range = window.quill.getSelection();
      window.ReactNativeWebView.postMessage(range.index);
      window.quill.insertEmbed(range.index, 'image', '${url}');
      range = window.quill.getSelection()
      window.ReactNativeWebView.postMessage(range.index);
      `;
      await webref.injectJavaScript(run);
      props.setContent(content + '<p><br></p>');
    } catch (err) {
      console.log(err, 'hello err');
    }
  };

  const cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setPopupVisible(false);
    ImagePicker.launchCamera(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        uploadToStorage(res);
      }
    });
  };

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    setPopupVisible(false);
    ImagePicker.launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        uploadToStorage(res);
      }
    });
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        ref={(r) => setWebref(r)}
        javaScriptEnabled={true}
        source={{
          html: `<head>
                  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
                  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
                 </head>
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
                    window.ReactNativeWebView.postMessage(quill.root.innerHTML);
                  });
                  quill.getModule('toolbar').addHandler('image', () => {
                   window.ReactNativeWebView.postMessage('image');
                  });
                </script>`,
        }}
        onMessage={(event) => {
          const {data} = event.nativeEvent;
          if (data === 'image') {
            Keyboard.dismiss();
            setPopupVisible(true);
          } else {
            console.log(data, '[console data]');
            props.setContent(data);
          }
        }}
        containerStyle={styles.webview}
      />
      <Dialog
        visible={popupVisible}
        onTouchOutside={() => {
          setPopupVisible(false);
        }}>
        <DialogContent>
          <TouchableOpacity onPress={cameraLaunch} style={styles.button}>
            <Text style={styles.buttonText}>Take a Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={imageGalleryLaunch} style={styles.button}>
            <Text style={styles.buttonText}>Pick a Photo from Gallery</Text>
          </TouchableOpacity>
        </DialogContent>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 'auto',
    margin: 'auto',
  },
  webview: {height: 100, width: 350},
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
