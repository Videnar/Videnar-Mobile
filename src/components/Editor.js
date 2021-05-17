import React from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { launchImageLibrary } from 'react-native-image-picker';

const WIDTH = Dimensions.get('window').width;

const Editor = ({ oldContent, loadContent }) => {
  const _editor = React.createRef();

  const toolOptions = [
    ['bold', 'italic', 'underline'],
    [{ script: 'sub' }, { script: 'super' }, 'code-block', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { font: [] }],
  ];

  const toolTheme = {
    size: 30,
    color: '#615353',
    background: '#FFB174',
    overlay: 'rgba(0,0,0,.1)',
  };

  const customHandler = (name) => {
    if (name === 'image') {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
        } else {
          console.log('Gallery Pick Successful');
          console.log(res.uri);
          _editor.current?.insertEmbed(
            500,
            'image',
            `https://picsum.photos/${WIDTH}/300`,
          );
        }
      });
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml={oldContent}
          onHtmlChange={({ html }) => loadContent(html)}
          loading="Editor Loading"
        />
        <QuillToolbar
          editor={_editor}
          options={toolOptions}
          theme={toolTheme}
          container={false}
          custom={{
            handler: customHandler,
            actions: ['image'],
          }}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editor: {
    flex: 1,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
});

export default Editor;
