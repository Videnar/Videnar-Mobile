import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { launchImageLibrary } from 'react-native-image-picker';

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
          mediaType: 'photo',
        },
        includeBase64: true,
        maxWidth: 640,
        maxHeight: 480,
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('Gallery Pick Successful');
          const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
          _editor.current?.insertEmbed(500, 'image', source.uri);
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
