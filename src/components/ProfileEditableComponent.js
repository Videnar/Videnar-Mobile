import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Overlay, Icon, Text, Card } from 'react-native-elements';

const ProfileEditableComponent = () => {
  return (
    <Card containerStyle={styles.optionsCard}>
      <View>
        <TouchableOpacity style={styles.cardItem}>
          <Icon name="edit" type="material" color="grey" />
          <Text style={styles.cardItemText}>Edit Exam Preference</Text>
        </TouchableOpacity>
        <Card.Divider style={styles.divider} />
        <TouchableOpacity style={styles.cardItem}>
          <Icon name="settings" type="material" color="grey" />
          <Text style={styles.cardItemText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </Card>
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
