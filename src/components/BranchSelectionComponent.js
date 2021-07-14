import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, ScrollView } from 'react-native';
import { Text, Overlay, ListItem, Header, Icon } from 'react-native-elements';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import { Branches } from '../utilities/constants/education';

const BranchSelectionComponent = ({ userPref, oldBranch }) => {
  const [showBranchOverlay, setShowBranchOverlay] = useState(false);
  const [selectText, setSelectText] = useState('Select');

  useEffect(() => {
    setSelectText(oldBranch);
  }, [oldBranch]);

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
    <View style={styles.container}>
      <Text style={styles.titleText}>Select Your Branch</Text>
      <Pressable
        onPress={() => setShowBranchOverlay(true)}
        style={styles.selector}>
        <Text style={styles.innerText}>{selectText}</Text>
        <Icon name="arrow-drop-down" type="material" color={GREY} />
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
            color: GREY,
            size: 30,
          }}
          centerComponent={{
            text: 'Select Your Branch',
            style: styles.headerText,
          }}
          backgroundColor="white"
        />
        <ScrollView>{RenderItem}</ScrollView>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 8,
    letterSpacing: 1,
    color: GREY,
  },
  selector: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 7,
  },
  list: {
    justifyContent: 'space-between',
  },
  innerText: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    letterSpacing: 1,
  },
});

export default BranchSelectionComponent;
