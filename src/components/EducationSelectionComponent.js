import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text, Overlay, Header, ListItem } from 'react-native-elements';
import { educations } from '../utilities/constants/education';

const EducationSelectionComponent = ({ userPref }) => {
  const [showEduOverlay, setShowEduOverlay] = useState(false);
  const [selectText, setSelectText] = useState('Select');

  const onPressHandler = (education) => {
    setSelectText(education);
    userPref({ education: education });
    setShowEduOverlay(false);
  };

  const RenderItem = educations.map((item) => (
    <ListItem
      key={item.level}
      containerStyle={styles.list}
      onPress={() => onPressHandler(item.level)}>
      <ListItem.Title>{item.level}</ListItem.Title>
      <ListItem.Chevron />
    </ListItem>
  ));
  return (
    <View>
      <Text>Education</Text>
      <Pressable
        onPress={() => setShowEduOverlay(true)}
        style={styles.selector}>
        <Text>{selectText}</Text>
      </Pressable>
      <Overlay
        isVisible={showEduOverlay}
        onBackdropPress={() => setShowEduOverlay(false)}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: 'white',
          }}
          leftComponent={{
            icon: 'arrow-back',
            onPress: () => setShowEduOverlay(false),
            color: 'white',
          }}
          centerComponent={{
            text: 'Select Your Education',
            style: styles.headerText,
          }}
          backgroundColor="purple"
        />
        <ScrollView>{RenderItem}</ScrollView>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    width: 150,
    height: 30,
    backgroundColor: 'yellow',
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

export default EducationSelectionComponent;
