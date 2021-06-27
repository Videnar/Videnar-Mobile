import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';

const DEFAULT_HEIGHT = Dimensions.get('window').width * 0.1;

const QuestionBodyComponent = ({ content, param }) => {
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
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);
  const [isMoreClicked, setIsMoreClicked] = useState(false);

  const updateAutoViewHeight = (height) => {
    if (param !== 'questiondetails') {
      if (height < DEFAULT_HEIGHT) {
        setIsMoreButtonVisible(false);
      } else if (height > DEFAULT_HEIGHT && isMoreClicked) {
        setIsMoreButtonVisible(false);
      } else {
        setIsMoreButtonVisible(true);
      }
    } else {
      setIsMoreClicked(true);
    }
  };

  return (
    <>
      <AutoHeightWebView
        originWhitelist={['*']}
        onSizeUpdated={(size) => updateAutoViewHeight(size.height)}
        source={{ html: HTML_ELEMENT }}
        style={isMoreClicked ? styles.webViewAuto : styles.defaultWebView}
      />
      {/** see more button display as per content size */}
      {isMoreButtonVisible ? (
        <TouchableOpacity
          onPress={() => setIsMoreClicked(true)}
          style={styles.moreContainer}>
          <Text style={styles.moreText}>... see more</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  defaultWebView: {
    width: 'auto',
    height: DEFAULT_HEIGHT,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  webViewAuto: {
    width: 'auto',
    marginVertical: 5,
    marginHorizontal: 10,
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
