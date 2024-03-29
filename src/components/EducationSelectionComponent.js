import React, { useState, useEffect } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, Overlay, Header, ListItem, Icon } from 'react-native-elements';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';
import { educations } from '../utilities/constants/education';
import BackArrowIcon from '../utilities/Icons/BackArrowIcon';

const EducationSelectionComponent = ({ userPref, education }) => {
  const [showEduOverlay, setShowEduOverlay] = useState(false);
  const [selectText, setSelectText] = useState('Select');

  useEffect(() => {
    education && setSelectText(education);
  }, [education]);

  const onPressHandler = (edu) => {
    setSelectText(edu);
    userPref({ education: edu });
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
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <Pressable
        onPress={() => setShowEduOverlay(true)}
        style={styles.selector}>
        <Text style={styles.innerText}>{selectText}</Text>
        <Icon name="arrow-drop-down" type="material" color={DEEP_GREEN} />
      </Pressable>
      <Overlay
        isVisible={showEduOverlay}
        onBackdropPress={() => setShowEduOverlay(false)}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: 'white',
          }}
          leftComponent={
            <TouchableOpacity onPress={() => setShowEduOverlay(false)}>
              <BackArrowIcon size={22} />
            </TouchableOpacity>
          }
          centerComponent={{
            text: 'Select Your Education',
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 8,
    letterSpacing: 2,
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
    elevation: 8,
    alignSelf: 'center',
  },
  list: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    letterSpacing: 1,
  },
  innerText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default EducationSelectionComponent;
