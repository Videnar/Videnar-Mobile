import React from 'react';
import {
  createAppContainer,
  // createSwitchNavigator
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
// import SigninScreen from './src/screens/SigninScreen';
// import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import QuestionScreen from './src/screens/QuestionScreen';
import {setNavigator} from './src/navigations/navigationRef';
// import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
// import { Provider as LocationProvider } from './src/context/LocationContext';
// import { FontAwesome } from '@expo/vector-icons';

const Home = createStackNavigator({
  Home: HomeScreen,
  Question: QuestionScreen,
});

// trackListFlow.navigationOptions = {
//   title: 'Tracks',
//   tabBarIcon: <FontAwesome name="th-list" size={20} />,
// };

// const switchNavigator = createSwitchNavigator({
//   loginFlow: createStackNavigator({
//     Signup: SignupScreen,
//     Signin: SigninScreen,
//   }),
//   mainFlow: createBottomTabNavigator({
//     trackListFlow,
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen,
//   }),
// });

const x = createBottomTabNavigator({
  Home,
  Activity: ActivityScreen,
  Profile: ProfileScreen,
});

const App = createAppContainer(x);

export default () => {
  return (
    <App
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    />
  );
};
