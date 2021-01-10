import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ActivityScreen from '../screens/ActivityScreen';
import QuestionDetailsScreen from '../screens/QuestionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AskQuestionScreen from '../screens/AskQuestionScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import WebViewScreen from '../screens/WebViewScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SelectEducationScreen from '../screens/SelectEducationScreen';
import SelectBranchScreen from '../screens/SelectBranchScreen';
import SelectExamsScreen from '../screens/SelectExamsScreen';

const Stack = createStackNavigator();
const InnerStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <InnerStack.Navigator
    initialRouteName="Home"
    screenOptions={{gestureEnabled: false}}>
    <InnerStack.Screen name="Home" component={HomeScreen} />
    <InnerStack.Screen
      name="QuestionDetails"
      component={QuestionDetailsScreen}
    />
    <InnerStack.Screen name="AskQuestion" component={AskQuestionScreen} />
  </InnerStack.Navigator>
);

export const Main = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#e91e63',
      showIcon: true,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({}) => (
          <Icon name="home" type="FontAwesome" style={{fontSize: 27}} />
        ),
      }}
    />
    <Tab.Screen
      name="Activity"
      component={ActivityScreen}
      options={{
        tabBarIcon: ({}) => (
          <Icon name="history" type="FontAwesome" style={{fontSize: 27}} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({}) => (
          <Icon name="search" type="FontAwesome" style={{fontSize: 27}} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({}) => (
          <Icon name="user" type="FontAwesome" style={{fontSize: 27}} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const Auth = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Signin" component={SigninScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="WebView" component={WebViewScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export const UserInfo = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="SelectEducation" component={SelectEducationScreen} />
    <Stack.Screen name="SelectBranch" component={SelectBranchScreen} />
    <Stack.Screen name="SelectExams" component={SelectExamsScreen} />
  </Stack.Navigator>
);
