import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { DEEP_GREEN } from '../assets/colors/colors';

const ImagePickerOverlay = ({
  isOverlayVisible,
  setIsOverlayVisible,
  editorRef,
}) => {
  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
      mediaType: 'photo',
      cameraRoll: false,
    },
    includeBase64: true,
    maxWidth: 640,
    maxHeight: 480,
  };

  const openGallery = () => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Gallery Pick Successful');
        const source = {
          uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
        };
        editorRef.current?.insertEmbed(500, 'image', source.uri);
      }
      setIsOverlayVisible(false);
    });
  };

  const openCamera = () => {
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('Image Captured and Inserted');
        const source = { uri: 'data:image/jpeg;base64,' + response.base64 };
        editorRef.current?.insertEmbed(500, 'image', source.uri);
      }
      setIsOverlayVisible(false);
    });
  };
  return (
    <Overlay
      isVisible={isOverlayVisible}
      onBackdropPress={() => setIsOverlayVisible(false)}
      overlayStyle={styles.overlay}
      backdropStyle={styles.backdropOverlay}>
      {/* Gallery Upload Button */}
      <Button
        type="solid"
        title="Upload From Gallery"
        iconRight
        icon={{ type: 'material', name: 'image', color: 'white' }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.title}
        onPress={openGallery}
      />
      {/* Camera Upload Button */}
      <Button
        type="solid"
        title="Open Camera"
        iconRight
        icon={{ type: 'material', name: 'photo-camera', color: 'white' }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        titleStyle={styles.title}
        onPress={openCamera}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '70%',
    borderRadius: 10,
  },
  backdropOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  button: {
    backgroundColor: DEEP_GREEN,
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    borderRadius: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  title: {
    paddingRight: 10,
  },
});
export default ImagePickerOverlay;
