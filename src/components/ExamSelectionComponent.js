import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Overlay,
  Button,
  Text,
  ListItem,
  Header,
  Icon,
} from 'react-native-elements';
import { DEEP_GREEN, GREY, LIGHT_GREEN } from '../assets/colors/colors';
import { educations } from '../utilities/constants/education';
import { getExamsString } from '../utilities/functions';
import BackArrowIcon from '../utilities/Icons/BackArrowIcon';

const ExamSelectionComponent = ({
  userPref,
  education,
  branch,
  oldExams,
  saveEnable,
}) => {
  const [visibleExamSelection, setVisibleExamSelection] = useState('false');
  const [exams, setExams] = useState([]);
  const [selectText, setSelectText] = useState('Select');

  useEffect(() => {
    if (oldExams) {
      const examsString = getExamsString(oldExams);
      setSelectText(examsString);
    }
  }, [oldExams]);

  const allExams = educations.filter((item) => item.level === education)[0]
    .exams;
  const onPressHandler = (exam) => {
    const dataArray = [...exams];
    let newExam = getRightExamName(exam);
    const index = dataArray.indexOf(newExam);
    if (index > -1) {
      dataArray.splice(index, 1);
    } else {
      dataArray.push(newExam);
    }
    setExams(dataArray);
  };

  const continueHandler = () => {
    exams.length > 0 ? saveEnable(true) : saveEnable(false);
    userPref({ exams: exams });
    const examsString = getExamsString(exams);
    setSelectText(examsString);

    setVisibleExamSelection(false);
  };

  const getRightExamName = (exam) => {
    let newExam = exam;
    if (exam === 'GATE' || exam === 'IES') {
      newExam = exam + ' (' + branch + ')';
    }
    return newExam;
  };

  const RenderItem = allExams.map((item) =>
    [...exams].includes(getRightExamName(item.key)) ? (
      //Item Selected
      <ListItem onPress={() => onPressHandler(item.key)} key={item.key}>
        <ListItem.Content>
          <ListItem.Title style={styles.itemSelected}>
            {item.key}
          </ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon type="material" name="check-circle" color={LIGHT_GREEN} />
      </ListItem>
    ) : (
      // Item not Selected
      <ListItem onPress={() => onPressHandler(item.key)} key={item.key}>
        <ListItem.Content>
          <ListItem.Title>{item.key}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon type="material" name="radio-button-unchecked" color={GREY} />
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
        <Icon name="library-add" type="material" color={DEEP_GREEN} />
      </Pressable>
      <Overlay
        isVisible={visibleExamSelection}
        onBackdropPress={continueHandler}>
        <Header
          statusBarProps={{
            barStyle: 'dark-content',
            backgroundColor: 'white',
          }}
          leftComponent={
            <TouchableOpacity onPress={continueHandler}>
              <BackArrowIcon size={22} />
            </TouchableOpacity>
          }
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
          titleStyle={styles.buttonText}
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
    alignSelf: 'center',
  },
  innerText: {
    fontSize: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: DEEP_GREEN,
    letterSpacing: 1,
  },
  itemSelected: {
    color: DEEP_GREEN,
  },
  button: {
    backgroundColor: DEEP_GREEN,
    width: '95%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});

export default ExamSelectionComponent;
