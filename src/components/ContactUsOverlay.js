import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Overlay, SocialIcon, Text, Icon, Button } from 'react-native-elements';
import email from 'react-native-email';
import { GREY } from '../assets/colors/colors';

const ContactUsOverlay = ({ visible, toggleVisible }) => {
  const socialLinkOpenHandler = (social) => {
    switch (social) {
      case 'f':
        Linking.openURL('https://www.facebook.com/Videnar');
        break;
      case 'i':
        Linking.openURL('https://www.instagram.com/videnar_hq');
        break;
      case 't':
        Linking.openURL('https://twitter.com/videnar_hq');
        break;
      default:
        Linking.openURL('https://videnar.com');
    }
  };

  const emailHandler = () => {
    const to = ['info@videnar.com'];
    email(to, {
      subject: 'Ticket No - 10',
    }).catch(console.error);
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleVisible}
      overlayStyle={styles.overlay}
      backdropStyle={styles.backDrop}>
      <Text style={styles.header}>Contact Us on</Text>
      <SocialIcon
        title="facebook"
        button
        raised
        type="facebook"
        style={styles.facebook}
        onPress={() => socialLinkOpenHandler('f')}
      />
      <SocialIcon
        title="instagram"
        button
        raised
        type="instagram"
        style={styles.insta}
        onPress={() => socialLinkOpenHandler('i')}
      />
      <SocialIcon
        title="twitter"
        button
        raised
        type="twitter"
        style={styles.twitter}
        onPress={() => socialLinkOpenHandler('t')}
      />
      <Button
        type="solid"
        icon={
          <Icon name="mail-outline" type="material" color="white" size={25} />
        }
        title="mail"
        buttonStyle={styles.mail}
        titleStyle={styles.title}
        onPress={() => emailHandler()}
      />
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: 300,
    borderRadius: 15,
    elevation: 100,
    alignContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  header: {
    fontSize: 18,
    paddingBottom: 15,
    color: GREY,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  facebook: {
    width: 210,
    borderRadius: 30,
    backgroundColor: '#0570E6',
  },
  insta: {
    width: 210,
    borderRadius: 30,
    backgroundColor: '#E13EAD',
  },
  twitter: {
    width: 210,
    borderRadius: 30,
    backgroundColor: '#1DA1F2',
  },
  mail: {
    backgroundColor: '#F34738',
    width: 210,
    height: 50,
    borderRadius: 30,
    marginTop: 7,
    justifyContent: 'space-evenly',
    paddingHorizontal: 35,
  },
});

export default ContactUsOverlay;
