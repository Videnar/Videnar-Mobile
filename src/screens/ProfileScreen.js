import React, { useContext } from 'react';
import { StyleSheet, Image, ScrollView, View, Dimensions } from 'react-native';
import { Text, Card, Header, Button } from 'react-native-elements';
import { AuthContext } from '../contexts/AuthContext';
import ProfileMoreComponent from '../components/ProfileMoreComponent';
import ProfileEditableComponent from '../components/ProfileEditableComponent';

const WIDTH = Dimensions.get('window').width;

const ProfileScreen = ({ navigation }) => {
  const {
    signOut,
    state: { name, photoURL },
  } = useContext(AuthContext);

  return (
    <ScrollView style={styles.container}>
      <Header
        statusBarProps={{
          barStyle: 'dark-content',
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent"
        rightComponent={<ProfileMoreComponent />} //More Options ...
      />
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
          <Text style={styles.nameText}>{name}</Text>
          {/* <Text style={styles.educationText}>Education: {level}</Text>
          {branch && <Text h5>Branch : {branch}</Text>} */}
          <Text style={styles.educationText}>Exams:</Text>
          {/* {exams.map((exam, index) => (
            <Text key={index} style={styles.examtags}>
              {exam}
            </Text>
          ))} */}
        </View>
      </View>
      <Card.Divider />
      <Card containerStyle={styles.activityCard}>
        <View style={styles.activity}>
          <Text>5 Questions Asked</Text>
          <Text>12 Questions Answered</Text>
        </View>
      </Card>
      <ProfileEditableComponent navigation={navigation} />
      <Button
        type="clear"
        raised
        title="Sign Out"
        onPress={signOut}
        titleStyle={styles.signOutText}
        buttonStyle={styles.signOutButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginLeft: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
  },
  details: {
    paddingLeft: 40,
    paddingTop: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    color: '#474949',
  },
  educationText: {
    fontSize: 16,
    letterSpacing: 1.6,
    color: 'black',
  },
  examtags: {
    color: 'red',
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  activityCard: {
    flex: 1,
    borderRadius: 10,
    elevation: 2,
  },
  signOutButton: {
    marginTop: 10,
    width: WIDTH * 0.5,
    alignItems: 'center',
    left: WIDTH * 0.25,
    borderRadius: 8,
  },
  signOutText: {
    color: 'grey',
  },
});

function propsAreEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default React.memo(ProfileScreen, propsAreEqual);
