import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
} from 'react-native';
import {
  Overlay,
  Button,
  Text,
  ListItem,
  Header,
  Icon,
} from 'react-native-elements';
import { educations } from '../utilities/constants/education';

const WIDTH = Dimensions.get('window').width;

const ExamSelectionComponent = ({ userPref, education, saveEnable }) => {
  const [visibleExamSelection, setVisibleExamSelection] = useState('false');
  const [exams, setExams] = useState([]);
  const [selectText, setSelectText] = useState('Select');

  const allExams = educations.filter((item) => item.level === education)[0]
    .exams;

  const onPressHandler = (exam) => {
    console.log(exams);
    const dataArray = [...exams];
    const index = dataArray.indexOf(exam);
    if (index > -1) {
      dataArray.splice(index, 1);
    } else {
      dataArray.push(exam);
    }
    console.log(dataArray);
    setExams(dataArray);
  };

  const continueHandler = () => {
    exams.length > 0 ? saveEnable(true) : saveEnable(false);
    userPref({ exams: exams });
    let populateExam = '';
    exams.forEach((exam) => {
      populateExam = populateExam.concat(exam + ', ');
    });
    console.log(populateExam.length);
    if (populateExam.length > 20) {
      populateExam = populateExam.substring(0, 19);
      populateExam = populateExam.concat('...');
    } else if (populateExam.length === 0) {
      populateExam = 'Select';
    } else {
      populateExam = populateExam
        .split('')
        .reverse()
        .join('')
        .replace(',', '')
        .split('')
        .reverse()
        .join('');
    }
    setSelectText(populateExam);

    setVisibleExamSelection(false);
  };

  const RenderItem = allExams.map((item) =>
    [...exams].includes(item.key) ? (
      //Item Selected
      <ListItem onPress={() => onPressHandler(item.key)} key={item.key}>
        <ListItem.Content>
          <ListItem.Title style={styles.itemSelected}>
            {item.key}
          </ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon type="material" name="check-circle" color="#3DDC84" />
      </ListItem>
    ) : (
      // Item not Selected
      <ListItem onPress={() => onPressHandler(item.key)} key={item.key}>
        <ListItem.Content>
          <ListItem.Title>{item.key}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon type="material" name="radio-button-unchecked" color="black" />
      </ListItem>
    ),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Select Exams Preparing For</Text>
      <Pressable
        onPress={() => setVisibleExamSelection(true)}
        style={styles.selector}>
        <Text style={styles.innerText}>{selectText}</Text>
        <Icon name="library-add" type="material" />
      </Pressable>
      <Overlay
        isVisible={visibleExamSelection}
        onBackdropPress={continueHandler}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: 'white',
          }}
          leftComponent={{
            icon: 'arrow-back',
            onPress: continueHandler,
            color: 'purple',
          }}
          centerComponent={{
            text: 'Select Exams',
            style: styles.headerText,
          }}
          backgroundColor="white"
        />
        <ScrollView>{RenderItem}</ScrollView>
        <Button
          title="Continue"
          onPress={continueHandler}
          buttonStyle={styles.button}
        />
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
  innerText: {
    fontSize: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'purple',
    letterSpacing: 1,
  },
  itemSelected: {
    color: '#3DDC84',
  },
  itemNotSelected: {
    color: 'black',
  },
  button: {
    backgroundColor: '#3DDC84',
  },
});

export default ExamSelectionComponent;
