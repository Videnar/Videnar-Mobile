import React, {useEffect} from 'react';
import {Linking} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = ({func}) => {
  const uri =
    'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
  // useEffect(() => {
  //   // Your code here
  //   func();
  // }, []);

  return (
    <WebView
      ref={(ref) => {
        this.webview = ref;
      }}
      source={{uri}}
      onNavigationStateChange={(event) => {
        //   if (event.url !== uri) {
        // this.webview.stopLoading();
        Linking.openURL(event.url);
        //   }
      }}
    />
  );
};

export default WebViewScreen;
