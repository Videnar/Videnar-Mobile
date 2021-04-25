import React from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const QuestionBodyComponent = ({ content }) => {
  return (
    <View>
      <WebView
        originWhitelist={['*']}
        source={{
          html: `<head>
                <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                 </head>
                 <body >
                <div>${content}</div>
                </body>`,
        }}
        style={styles.WebView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  WebView: {
    width: 'auto',
    height: 50,
  },
});

export default QuestionBodyComponent;
