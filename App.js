import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import {setNavigator} from './src/navigations/navigationRef';

const Main = createStackNavigator({
  Home: HomeScreen,
  Question: QuestionScreen,
});

// trackListFlow.navigationOptions = {
//   title: 'Tracks',
//   tabBarIcon: <FontAwesome name="th-list" size={20} />,
// };

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Home: Main,
    Activity: ActivityScreen,
    Profile: ProfileScreen,
  }),
});

const AppContent = createAppContainer(switchNavigator);

const App = () => {
  return (
    <AppContent
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    />
  );
};

export default App;
