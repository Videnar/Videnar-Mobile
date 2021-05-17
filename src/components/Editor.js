import React from 'react';
import { StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import QuillEditor, { QuillToolbar } from 'react-native-cn-quill';

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <QuillEditor
        style={styles.editor}
        ref={_editor}
        initialHtml={oldContent}
        onHtmlChange={async ({ html }) => await loadContent(html)}
        loading="Editor Loading"
      />
      <QuillToolbar
        editor={_editor}
        options={toolOptions}
        theme={toolTheme}
        container={false}
      />
    </KeyboardAvoidingView>
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
