import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header, Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ActivityScreen from '../screens/ActivityScreen';
import QuestionDetailsScreen from '../screens/QuestionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AskQuestionScreen from '../screens/AskQuestionScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import SelectBranchScreen from '../screens/SelectBranchScreen';
import SelectExamsScreen from '../screens/SelectExamsScreen';
import UserPreferenceScreen from '../screens/UserPreferenceScreen';

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
    <Tab.Screen name="Activity" component={ActivityScreen} />
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
