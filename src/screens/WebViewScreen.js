import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

export default ({
  route: {
    params: { uri },
  },
}) => {
  const [URL, setURL] = useState(uri || null);
  useEffect(() => {
    Linking.addEventListener('url', openWebViewScreen());
    return Linking.removeEventListener('url');
  });

  const openWebViewScreen = async () => {
    const initialUrl = await Linking.getInitialURL();
    console.log(initialUrl, 'initialUrl');
    initialUrl && setURL(initialUrl);
  };
  return <WebView originWhitelist={['*']} source={URL} />;
};
