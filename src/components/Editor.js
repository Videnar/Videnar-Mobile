import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import ImagePicker from 'react-native-image-picker';
import {v4 as uuid} from 'uuid';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {Storage} from 'aws-amplify';
import config from './aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

const Editor = (props) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const content = props.content || '<p><br></p>';

  const uploadToStorage = async (imageData) => {
    const {uri, fileName, timestamp, type} = imageData;
    try {
      const response = await fetch(uri);

      const blob = await response.blob();

      const key = `${timestamp}.${uuid()}.${fileName}.`;

      Storage.put(key, blob, {
        contentType: type,
      });
      const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`;
    } catch (err) {
      console.log(err);
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
        console.log(res.timestamp);
        const {uri, fileName} = res;
        uploadToStorage(uri, fileName);
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
    <View>
      <WebView
        originWhitelist={['*']}
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
                function imageHandler(image, callback) {
                  window.ReactNativeWebView.postMessage(quill.root.innerHTML);
                }
                function insertToEditor(url) {
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', url);
    }
                var toolbarOptions = [[ 'bold', 'italic', { 'color': [] }, 'blockquote',  'code-block', 'image', 'video',{ header: 1 }, { header: 2 }, { 'list': 'ordered'}, { 'list': 'bullet' },{ 'script': 'sub'}, { 'script': 'super' }, 'link', 'formula', ],];
                var quill = new Quill('#editor', {
                  modules: {
                    toolbar: toolbarOptions
                  },
                  placeholder: 'Describe your question...',
                   theme: 'snow'
                  });
          quill.on('text-change', function(delta, oldDelta, source) {
                 window.ReactNativeWebView.postMessage('quill.root.innerHTML');
           });
    quill.getModule('toolbar').addHandler('image', () => {
       window.ReactNativeWebView.postMessage('image');
    });
    </script>`,
        }}
        onMessage={(event) => {
          const {data} = event.nativeEvent;
          if (data === 'image') {
            setPopupVisible(true);
          } else {
            props.setContent(data);
          }
        }}
        containerStyle={{height: 100, width: 350}}
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
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    // backgroundColor: '#3740ff',
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
