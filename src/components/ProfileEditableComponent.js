import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Icon, Text, Card } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';
import SettingsOverlay from './SettingsOverlay';

const ProfileEditableComponent = ({ navigation }) => {
  const { changeScreen } = useContext(Context);

  const [settingsOverlay, setSettingsOverlay] = useState(false);

  const onEditExamPreferences = () => {
    changeScreen('UserPref');
  };
  const toggleOverlay = () => {
    setSettingsOverlay(!settingsOverlay);
  };

  return (
    <>
      <Card containerStyle={styles.optionsCard}>
        <View>
          <TouchableOpacity
            style={styles.cardItem}
            onPress={onEditExamPreferences}>
            <Icon name="edit" type="material" color={GREY} />
            <Text style={styles.cardItemText}>Edit Exam Preference</Text>
          </TouchableOpacity>
          <Card.Divider style={styles.divider} />
          <TouchableOpacity
            onPress={() => setSettingsOverlay(true)}
            style={styles.cardItem}>
            <Icon name="settings" type="material" color={GREY} />
            <Text style={styles.cardItemText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <SettingsOverlay
        visible={settingsOverlay}
        toggleVisible={toggleOverlay}
        navigation={navigation}
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
