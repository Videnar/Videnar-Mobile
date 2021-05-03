import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { FAB, Header, Icon, Overlay, Text } from 'react-native-elements';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProceedToAnswerComponent = () => {
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  return (
    <>
      <FAB
        title="Answer"
        iconRight
        icon={<Icon type="material" name="add" color="white" />}
        placement="right"
        onPress={() => setIsEditorVisible(true)}
        color="#3DDC84"
      />
      {/** Editor is Passed Here */}
      <Overlay
        isVisible={isEditorVisible}
        onBackdropPress={() => setIsEditorVisible(false)}
        overlayStyle={styles.overlay}>
        <Header
          statusBarProps={{
            backgroundColor: 'white',
            barStyle: 'dark-content',
          }}
          leftComponent={
            <Icon
              name="arrow-back"
              type="material"
              onPress={() => setIsEditorVisible(false)}
            />
          }
          centerComponent={{
            text: 'Write Your Answer',
            style: styles.headerText,
          }}
          backgroundColor="white"
        />
        <Text>Editor Here</Text>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: WIDTH,
    height: HEIGHT,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 0.5,
  },
});

export default ProceedToAnswerComponent;
