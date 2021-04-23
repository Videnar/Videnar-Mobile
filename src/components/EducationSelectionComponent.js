import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Text, Overlay, Header, ListItem, Icon } from 'react-native-elements';
import { educations } from '../utilities/constants/education';

const WIDTH = Dimensions.get('window').width;

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
    <View style={styles.container}>
      <Text style={styles.title}>Education</Text>
      <Pressable
        onPress={() => setShowEduOverlay(true)}
        style={styles.selector}>
        <Text style={styles.innerText}>{selectText}</Text>
        <Icon name="arrow-drop-down" type="material" />
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
            color: 'purple',
          }}
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
    paddingEnd: 5,
  },
  list: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 1,
  },
  innerText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default EducationSelectionComponent;
