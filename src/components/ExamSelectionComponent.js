import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Overlay,
  Button,
  Text,
  ListItem,
  BottomSheet,
} from 'react-native-elements';
import { educations } from '../utilities/constants/education';

const ExamSelectionComponent = ({ userPref, education }) => {
  const [visibleExamSelection, setVisibleExamSelection] = useState('false');
  const [exams, setExams] = useState([]);
  const allExams = educations.filter((item) => item.level === education)[0]
    .exams;
  console.log(allExams);

  const onPressHandler = (item) => {
    const dataArray = [...exams];
    const index = dataArray.indexOf(item);
    if (index > -1) {
      dataArray.splice(index, 1);
    } else {
      dataArray.push(item);
    }
    setExams([...dataArray]);
  };

  const RenderItem = allExams.map((item) => (
    <ListItem
      onPress={() => onPressHandler(item)}
      style={
        [...exams].includes(item) ? styles.itemSelected : styles.itemNotSelected
      }>
      <ListItem.Title>{item}</ListItem.Title>
    </ListItem>
  ));

  return (
    <View>
      <Text>Select Exams Preparing For</Text>
      <Pressable
        onPress={() => setVisibleExamSelection(true)}
        style={styles.selector}>
        <Text>Select Here</Text>
      </Pressable>
      <BottomSheet isVisible={visibleExamSelection}>
        <View style={styles.buttomSheetContainer}>{RenderItem}</View>
        <Button title="Cancel" onPress={() => setVisibleExamSelection(false)} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  selector: {
    backgroundColor: 'purple',
  },
  buttomSheetContainer: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'space-around',
  },
  itemSelected: {
    padding: 10,
    borderRadius: 100,
    margin: 7,
    backgroundColor: '#de5f57',
  },
  itemNotSelected: {
    padding: 10,
    borderRadius: 100,
    margin: 7,
    backgroundColor: '#c7a32c',
  },
});

export default ExamSelectionComponent;
