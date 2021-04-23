import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Overlay, ListItem, Header, Icon } from 'react-native-elements';
import { Branches } from '../utilities/constants/education';

const WIDTH = Dimensions.get('window').width;

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
    <View style={styles.container}>
      <Text style={styles.titleText}>Select Your Branch</Text>
      <Pressable
        onPress={() => setShowBranchOverlay(true)}
        style={styles.selector}>
        <Text style={styles.innerText}>{selectText}</Text>
        <Icon name="arrow-drop-down" type="material" />
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
            color: 'orange',
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
  },
  selector: {
    width: WIDTH * 0.9,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    borderRadius: 8,
    elevation: 3,
    paddingHorizontal: 20,
  },
  list: {
    justifyContent: 'space-between',
  },
  innerText: {
    fontSize: 15,
    letterSpacing: 0.5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    letterSpacing: 0.5,
  },
});

export default BranchSelectionComponent;
