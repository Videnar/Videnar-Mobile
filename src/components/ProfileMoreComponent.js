import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Overlay, Icon, Text } from 'react-native-elements';
import Share from 'react-native-share';
import ContactUsOverlay from './ContactUsOverlay';

const ProfileMoreComponent = () => {
  const [visible, setVisible] = useState(false);
  const [visibleContact, setVisibleContact] = useState(false);

  const toggleOverlayMore = () => {
    setVisible(!visible);
  };
  const toggleOverlayContact = () => {
    setVisibleContact(!visibleContact);
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
    setVisible(!visible);
  };

  const contactSupportHandler = () => {
    setVisibleContact(true); // Visible Contact us
    setVisible(!visible); // Close More Options
  };

  return (
    <>
      <Icon type="material" name="more-vert" onPress={() => setVisible(true)} />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlayMore}
        overlayStyle={styles.overlay}
        backdropStyle={styles.backdrop}>
        <TouchableOpacity
          onPress={contactSupportHandler}
          style={styles.pressable}>
          <Text style={styles.text}>Contact Us</Text>
          <Icon type="material" name="info" color="blue" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={shareAppHandler} style={styles.pressable}>
          <Text style={styles.text}>Share Our App</Text>
          <Icon type="material" name="share" color="green" size={22} />
        </TouchableOpacity>
      </Overlay>
      <ContactUsOverlay
        visible={visibleContact}
        toggleVisible={toggleOverlayContact}
      />
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
    borderRadius: 8,
    width: 150,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backdrop: {
    backgroundColor: 'transparent',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    letterSpacing: 1,
  },
});

export default ProfileMoreComponent;
