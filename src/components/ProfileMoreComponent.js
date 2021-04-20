import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Overlay, Icon, Text, Card } from 'react-native-elements';
import Share from 'react-native-share';

const ProfileMoreComponent = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const shareAppHandler = () => {
    const options = {
      message:
        'Hey There! Join Vedenar and start your career journey without any distraction',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const contactSupportHandler = () => {
    console.log('Contact us Clicked!');
  };

  return (
    <>
      <Icon type="material" name="more-vert" onPress={() => setVisible(true)} />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
        backdropStyle={styles.backdrop}>
        <Pressable onPress={contactSupportHandler} style={styles.pressable}>
          <Text>Contact Us</Text>
          <Icon type="material" name="info" color="blue" />
        </Pressable>
        <Pressable onPress={shareAppHandler} style={styles.pressable}>
          <Text>Share</Text>
          <Icon type="material" name="share" color="green" />
        </Pressable>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 22,
    top: 35,
    elevation: 20,
    borderRadius: 10,
    width: 150,
    padding: 10,
  },
  backdrop: {
    backgroundColor: 'transparent',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default ProfileMoreComponent;
