import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {API, graphqlOperation} from 'aws-amplify';
import {listQuestions} from '../graphql/queries';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    try {
      const questionsData = await API.graphql(graphqlOperation(listQuestions));
      const questions = questionsData.data.listQuestions.items;
      this.setState({
        questions: [...this.state.questions, ...questions],
      });
    } catch (err) {
      console.log('error fetching questions', err);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Button
            title="Question"
            onPress={() => this.props.navigation.navigate('Question')}
          />
          {this.state.questions.map((question, index) => (
            <View key={question.id ? question.id : index}>
              <Text style={styles.questionTitle}>{question.title}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20},
  scrollView: {marginHorizontal: 0},
  input: {height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8},
  questionTitle: {fontSize: 18},
});

export default HomeScreen;
