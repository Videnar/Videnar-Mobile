import React, { useContext, useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Icon, Text, Card } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import SettingsOverlay from './SettingsOverlay';

const ProfileEditableComponent = ({ navigation }) => {
  const { changeScreen } = useContext(AuthContext);

  const [settingsOverlay, setSettingsOverlay] = useState(false);

  const onEditExamPreferences = () => {
    changeScreen('UserInfo');
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
            <Icon name="edit" type="material" color="grey" />
            <Text style={styles.cardItemText}>Edit Exam Preference</Text>
          </TouchableOpacity>
          <Card.Divider style={styles.divider} />
          <TouchableOpacity
            onPress={() => setSettingsOverlay(true)}
            style={styles.cardItem}>
            <Icon name="settings" type="material" color="grey" />
            <Text style={styles.cardItemText}>Setting</Text>
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
    color: 'grey',
  },
});

export default ProfileEditableComponent;
