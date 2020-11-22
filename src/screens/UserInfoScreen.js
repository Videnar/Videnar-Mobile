import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import {education} from '../utilities/constants/education';

const UserInfoScreen = () => {
  const [data, setData] = useState(education);
  const RenderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setData(item.BRANCHES)}
      style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(item) => item.level || item}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default UserInfoScreen;
