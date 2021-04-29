import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header, Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import QuestionActivityScreen from '../screens/QuestionActivityScreen';
import AnswerActivityScreen from '../screens/AnswerActivityScreen';
import CommentActivityScreen from '../screens/CommentActivityScreen';
import QuestionDetailsScreen from '../screens/QuestionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AskQuestionScreen from '../screens/AskQuestionScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SelectEducationScreen from '../screens/SelectEducationScreen';
import SelectBranchScreen from '../screens/SelectBranchScreen';
import SelectExamsScreen from '../screens/SelectExamsScreen';
import UserPreferenceScreen from '../screens/UserPreferenceScreen';

const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const InnerStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Home = () => (
  <InnerStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <InnerStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Home' }}
    />
    <InnerStack.Screen
      name="QuestionDetails"
      component={QuestionDetailsScreen}
    />
    <InnerStack.Screen name="AskQuestion" component={AskQuestionScreen} />
  </InnerStack.Navigator>
);

const ActivityTabs = () => {
  return (
    <>
      <Header
        statusBarProps={{ backgroundColor: 'white', barStyle: 'dark-content' }}
        placement="left"
        centerComponent={{
          text: 'Activity',
          style: {
            color: '#A97CB0',
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 1.5,
          },
        }}
        backgroundColor="white"
      />
      <TopTab.Navigator>
        <TopTab.Screen name="Questions" component={QuestionActivityScreen} />
        <TopTab.Screen name="Answers" component={AnswerActivityScreen} />
        <TopTab.Screen name="Comments" component={CommentActivityScreen} />
        {/* <TopTab.Screen name="BookMarks" component={ProfileScreen} /> */}
      </TopTab.Navigator>
    </>
  );
};

export const Main = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: '#e91e63',
      showIcon: true,
      style: { backgroundColor: 'white' },
      showLabel: false,
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let fontsize;
        let colorName;
        let style;
        if (route.name === 'Home') {
          iconName = 'home';
          fontsize = focused ? 36 : 32;
          colorName = focused ? '#8000FF' : '#857683';
        } else if (route.name === 'Activity') {
          iconName = 'done-all';
          fontsize = focused ? 36 : 32;
          colorName = focused ? '#8000FF' : '#857683';
        } else if (route.name === 'Search') {
          iconName = 'search';
          fontsize = focused ? 36 : 32;
          colorName = focused ? '#8000FF' : '#857683';
          style = { transform: [{ rotateY: '180deg' }] };
        } else {
          iconName = 'person';
          fontsize = focused ? 36 : 32;
          colorName = focused ? '#8000FF' : '#857683';
        }

        return (
          <Icon
            name={iconName}
            type="material"
            color={colorName}
            size={fontsize}
            iconStyle={style}
          />
        );
      },
    })}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Activity" component={ActivityTabs} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export const Auth = () => (
  <Stack.Navigator
    initialRouteName="signin"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Signin" component={SigninScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export const UserInfo = () => (
  <Stack.Navigator
    initialRouteName="userPref"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="userPref" component={UserPreferenceScreen} />
    <Stack.Screen name="SelectBranch" component={SelectBranchScreen} />
    <Stack.Screen name="SelectExams" component={SelectExamsScreen} />
  </Stack.Navigator>
);
