import React, { useState } from 'react';
import { Pressable, StyleSheet, View, ScrollView } from 'react-native';
import { Text, Overlay, ListItem, Header } from 'react-native-elements';
import { Branches } from '../utilities/constants/education';

const BranchSelectionComponent = ({ userPref }) => {
  const [showBranchOverlay, setShowBranchOverlay] = useState(false);
  const [selectText, setSelectText] = useState('Select');

  const onPressHandler = (branch) => {
    setSelectText(branch);
    userPref({ branch: branch });
    setShowBranchOverlay(false);
  };

  const RenderItem = Branches.map((item) => (
    <ListItem
      key={item}
      containerStyle={styles.list}
      onPress={() => onPressHandler(item)}>
      <ListItem.Title>{item}</ListItem.Title>
      <ListItem.Chevron />
    </ListItem>
  ));

  return (
    <View>
      <Text>Select Your Preferred Branch</Text>
      <Pressable
        onPress={() => setShowBranchOverlay(true)}
        style={styles.selector}>
        <Text>{selectText}</Text>
      </Pressable>
      <Overlay
        isVisible={showBranchOverlay}
        onBackdropPress={() => setShowBranchOverlay(false)}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: 'white',
          }}
          leftComponent={{
            icon: 'arrow-back',
            onPress: () => setShowBranchOverlay(false),
            color: 'white',
          }}
          centerComponent={{
            text: 'Select Your Branch',
            style: styles.headerText,
          }}
          backgroundColor="orange"
        />
        <ScrollView>{RenderItem}</ScrollView>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    backgroundColor: 'pink',
  },
  list: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BranchSelectionComponent;
