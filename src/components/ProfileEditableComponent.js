import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-elements';
import Share from 'react-native-share';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';
import EditIcon from '../utilities/Icons/EditIcon';
import InfoIcon from '../utilities/Icons/InfoIcon';
import SettingIcon from '../utilities/Icons/SettingIcon';
import ShareIcon from '../utilities/Icons/ShareIcon';
import ContactUsOverlay from './ContactUsOverlay';
import SettingsOverlay from './SettingsOverlay';

const ProfileEditableComponent = ({ navigation }) => {
  const { changeScreen } = useContext(Context);

  const [settingsOverlay, setSettingsOverlay] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleContact, setVisibleContact] = useState(false);

  const toggleOverlayContact = () => {
    setVisibleContact(!visibleContact);
  };

  const shareAppHandler = () => {
    const options = {
      message:
        'Hello! Join Videnar by downloading the app in the link below and get help in your studies!  https://play.google.com/store/apps/details?id=com.videnar',
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

  const onEditExamPreferences = () => {
    changeScreen('UserPref', 'Main');
  };
  const toggleOverlay = () => {
    setSettingsOverlay(!settingsOverlay);
  };

  return (
    <>
      <Card containerStyle={styles.optionsCard}>
        <TouchableOpacity
          style={styles.cardItem}
          onPress={onEditExamPreferences}>
          <EditIcon size={30} />
          <Text style={styles.cardItemText}>Edit Exam Preference</Text>
        </TouchableOpacity>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() => setSettingsOverlay(true)}
          style={styles.cardItem}>
          <SettingIcon size={30} />
          <Text style={styles.cardItemText}>Settings</Text>
        </TouchableOpacity>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity
          onPress={contactSupportHandler}
          style={styles.cardItem}>
          <InfoIcon size={28} />
          <Text style={styles.cardItemText}>Contact Us</Text>
        </TouchableOpacity>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity onPress={shareAppHandler} style={styles.cardItem}>
          <ShareIcon size={30} />
          <Text style={styles.cardItemText}>Invite Friends</Text>
        </TouchableOpacity>
      </Card>
      {/* Change Password */}
      <SettingsOverlay
        visible={settingsOverlay}
        toggleVisible={toggleOverlay}
        navigation={navigation}
      />
      {/* Contact us */}
      <ContactUsOverlay
        visible={visibleContact}
        toggleVisible={toggleOverlayContact}
      />
    </>
  );
};

const styles = StyleSheet.create({
  optionsCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 1,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginTop: 13,
  },
  cardItemText: {
    marginLeft: 10,
    paddingBottom: 5,
    fontWeight: 'bold',
    color: GREY,
    letterSpacing: 1,
    fontSize: 15,
  },
});

export default ProfileEditableComponent;
