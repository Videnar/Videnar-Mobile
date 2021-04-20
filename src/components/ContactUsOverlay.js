import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Overlay, SocialIcon, Text, Icon, Button } from 'react-native-elements';
import email from 'react-native-email';

const ContactUsOverlay = ({ visible, toggleVisible }) => {
  const socialLinkOpenHandler = (social) => {
    switch (social) {
      case 'f':
        Linking.openURL('https://fb.com');
        break;
      case 't':
        Linking.openURL('https://twitter.com');
        break;
      case 'i':
        Linking.openURL('https://instagram.com');
        break;
      default:
        Linking.openURL('https://videnar.com');
    }
  };

  const emailHandler = () => {
    const to = ['info@videnar.com'];
    email(to, {
      subject: 'Ticket No - 10020',
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
        style={styles.social}
        onPress={() => socialLinkOpenHandler('f')}
      />
      <SocialIcon
        title="instagram"
        button
        raised
        type="instagram"
        style={styles.social}
        onPress={() => socialLinkOpenHandler('i')}
      />
      <SocialIcon
        title="twitter"
        button
        raised
        type="twitter"
        style={styles.social}
        onPress={() => socialLinkOpenHandler('t')}
      />
      <Button
        type="solid"
        icon={
          <Icon name="mail-outline" type="material" color="white" size={25} />
        }
        title="mail"
        buttonStyle={styles.button}
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
  },
  button: {
    backgroundColor: '#E40D0D',
    width: 210,
    height: 50,
    borderRadius: 30,
    marginTop: 7,
    justifyContent: 'space-evenly',
  },
  social: {
    width: 210,
    borderRadius: 30,
  },
});

export default ContactUsOverlay;
