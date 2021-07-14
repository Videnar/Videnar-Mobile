import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements';
import { GREY } from '../assets/colors/colors';
import { Context } from '../contexts';

function ProfileDetails() {
  const {
    state: { userDisplayName, photoURL, preferences },
  } = useContext(Context);

  const { education, branch, exams } = preferences;

  // Refactoring exams into 2 halfs
  let firstHalfExams = [];
  let lastHalfExams = [];
  if (exams.length > 3) {
    firstHalfExams = exams.slice(0, exams.length / 2);
    lastHalfExams = exams.slice(exams.length / 2);
  } else {
    firstHalfExams = exams;
  }

  const _renderItem = ({ item }) => {
    if (item.match('GATE')) {
      item = 'GATE';
    }
    if (item.match('IES')) {
      item = 'IES';
    }
    return (
      <Card containerStyle={styles.exams}>
        <Text style={styles.examtags}>{item}</Text>
      </Card>
    );
  };

  return (
    <View>
      <View style={styles.profile}>
        <Image
          style={styles.picture}
          source={
            photoURL
              ? { uri: photoURL }
              : require('../assets/images/DefaultProfilePic.png')
          }
        />
        <View style={styles.details}>
          <Text style={styles.nameText}>{userDisplayName}</Text>
          <Text style={styles.educationText}>
            {<Text style={styles.userData}>{education}</Text>}
          </Text>
          {branch && (
            <Text style={styles.educationText}>
              {<Text style={styles.userData}>{branch}</Text>}
            </Text>
          )}
        </View>
      </View>
      {/** Exam Preferences */}
      <View style={styles.examsContainer}>
        <FlatList
          data={firstHalfExams}
          renderItem={_renderItem}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
        {lastHalfExams.length > 0 && (
          <FlatList
            data={lastHalfExams}
            renderItem={_renderItem}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5%',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  details: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '60%',
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    color: GREY,
  },
  userData: {
    color: GREY,
    letterSpacing: 0.5,
  },
  educationText: {
    fontSize: 16,
    letterSpacing: 1,
    color: GREY,
  },
  examsContainer: {
    marginHorizontal: '2%',
  },
  exams: {
    borderRadius: 5,
    paddingVertical: 2,
    justifyContent: 'center',
    backgroundColor: '#E6E5E6',
    marginHorizontal: 8,
  },
  examtags: {
    color: 'grey',
    letterSpacing: 0.5,
    alignSelf: 'center',
  },
});

export default ProfileDetails;
