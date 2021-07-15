import React from 'react';
import { StyleSheet } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import WebView from 'react-native-webview';
import { GREY } from '../assets/colors/colors';

const DEFAULT_HEIGHT = 100;

const QuestionBodyComponent = ({ content, param }) => {
  if (param !== 'questiondetails' && content.length > 140) {
    content = content.slice(0, 140) + ' ...';
  }
  // html contents to show
  const HTML_ELEMENT = `<head>
                          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
                        </head>
                        <body 
                          style="
                            text-align:auto; 
                            letter-spacing:0.5; 
                            font-size: 1.075rem;
                            color: black" >
                          <div>${content}</div>
                        </body>`;

  return (
    <>
      {param === 'questiondetails' ? (
        <AutoHeightWebView
          originWhitelist={['*']}
          source={{ html: HTML_ELEMENT }}
          style={styles.autoWebView}
        />
      ) : (
        <WebView
          originWhitelist={['*']}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          source={{ html: HTML_ELEMENT }}
          style={styles.webView}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  webView: {
    width: 'auto',
    height: DEFAULT_HEIGHT,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  autoWebView: {
    width: 'auto',
    marginVertical: 20,
    marginHorizontal: 5,
  },
  moreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
  moreText: {
    color: GREY,
    fontWeight: 'bold',
    letterSpacing: 0.7,
    paddingRight: 10,
    fontSize: 16,
  },
});

export default React.memo(QuestionBodyComponent);
