import React, { useState } from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';
import { GREY, WHITE } from '../assets/colors/colors';
import ImagePickerOverlay from './ImagePickerOverlay';

const Editor = ({ contentRef }) => {
  const _editor = React.createRef();
  const [isImagePickVisible, setIsImagePickVisible] = useState(false);

  const toolOptions = [
    ['bold', 'italic', 'underline'],
    [{ script: 'sub' }, { script: 'super' }, 'code-block', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { font: [] }],
  ];

  const toolTheme = {
    size: 30,
    color: GREY,
    background: WHITE,
    overlay: 'rgba(92,92,92,.1)',
  };

  const customHandler = (name) => {
    if (name === 'image') {
      setIsImagePickVisible(true);
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
          initialHtml={contentRef.current}
          onHtmlChange={({ html }) => (contentRef.current = html)}
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
      {/* Image Picker Overlay */}
      <ImagePickerOverlay
        isOverlayVisible={isImagePickVisible}
        setIsOverlayVisible={(value) => setIsImagePickVisible(value)}
        editorRef={_editor}
      />
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
