import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Icon, ListItem, Overlay, Text } from 'react-native-elements';
import { DEEP_GREEN, GREY, LIGHT_GREEN } from '../assets/colors/colors';
import { Context } from '../contexts';

function EditorTagsOverlay({ isVisible, setIsVisible, onSubmitPressed }) {
  const {
    state: {
      preferences: { exams },
    },
  } = useContext(Context);
  const [tags, setTags] = useState([]);

  const onPressHandler = (exam) => {
    const dataArray = [...tags];
    const index = dataArray.indexOf(exam);
    if (index > -1) {
      dataArray.splice(index, 1);
    } else {
      dataArray.push(exam);
    }
    setTags(dataArray);
  };

  const examName = (exam) => {
    if (exam.match('GATE')) {
      return '# GATE';
    } else if (exam.match('IES')) {
      return '# IES';
    } else {
      return '# ' + exam;
    }
  };

  const renderItems = exams.map((exam) =>
    tags.includes(exam) ? (
      <ListItem onPress={() => onPressHandler(exam)} key={exams.indexOf(exam)}>
        <ListItem.Content>
          <ListItem.Title style={styles.itemSelected}>
            {examName(exam)}
          </ListItem.Title>
        </ListItem.Content>
        <Icon type="material" name="check-circle" color={LIGHT_GREEN} />
      </ListItem>
    ) : (
      <ListItem onPress={() => onPressHandler(exam)} key={exams.indexOf(exam)}>
        <ListItem.Content>
          <ListItem.Title>{examName(exam)}</ListItem.Title>
        </ListItem.Content>
        <Icon type="material" name="radio-button-unchecked" color={GREY} />
      </ListItem>
    ),
  );

  return (
    <Overlay
      visible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      overlayStyle={styles.overlay}>
      <Text style={styles.headerText}>Select Exam tags</Text>
      <View style={styles.scrollContainer}>
        <ScrollView>{renderItems}</ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          buttonStyle={styles.submitButton}
          titleStyle={styles.titleText}
          onPress={() => onSubmitPressed(tags)}
        />
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: '60%',
    width: '70%',
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    alignSelf: 'center',
    color: DEEP_GREEN,
    margin: '1%',
  },
  scrollContainer: {
    flex: 5,
    margin: '2%',
  },
  itemSelected: {
    color: DEEP_GREEN,
  },
  buttonContainer: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: DEEP_GREEN,
    width: '60%',
    alignSelf: 'center',
    marginVertical: '3%',
    borderRadius: 7,
  },
  titleText: {
    letterSpacing: 1,
  },
});

export default EditorTagsOverlay;
