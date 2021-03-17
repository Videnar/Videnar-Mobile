import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

export default function ActionDialog({
  popupVisible,
  setPopupVisible,
  editItem,
  deleteItem,
}) {
  return (
    <View>
      <Dialog
        visible={popupVisible}
        onTouchOutside={() => {
          setPopupVisible(false);
        }}>
        <DialogContent>
          <Pressable onPress={editItem} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable onPress={deleteItem} style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
          {/* <Pressable onPress={} style={styles.button}>
            <Text style={styles.buttonText}>Report</Text>
          </Pressable> */}
        </DialogContent>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  text: { height: 40, borderColor: 'gray' },
});
