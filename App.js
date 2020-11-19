import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import QuestionDetailsScreen from './src/screens/QuestionDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AskQuestionScreen from './src/screens/AskQuestionScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import {setNavigator} from './src/navigations/navigationRef';
import {Provider as AuthProvider} from './src/contexts/AuthContext';

const Main = createStackNavigator({
  Home: HomeScreen,
  QuestionDetails: QuestionDetailsScreen,
  AskQuestion: AskQuestionScreen,
});

// trackListFlow.navigationOptions = {
//   title: 'Tracks',
//   tabBarIcon: <FontAwesome name="th-list" size={20} />,
// };

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen,
      ForgotPassword: ForgotPasswordScreen,
    }),
    mainFlow: createBottomTabNavigator({
      Home: Main,
      Activity: ActivityScreen,
      Profile: ProfileScreen,
    }),
  },
  {
    initialRouteName: 'ResolveAuth',
  },
);

const AppContainer = createAppContainer(switchNavigator);

const App = () => {
  return (
    <AuthProvider>
      <AppContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      />
    </AuthProvider>
  );
};

export default App;
