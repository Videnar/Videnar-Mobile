import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import QuestionActivityScreen from '../screens/QuestionActivityScreen';
import AnswerActivityScreen from '../screens/AnswerActivityScreen';
import QuestionDetailsScreen from '../screens/QuestionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditorScreen from '../screens/EditorScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { DEEP_GREEN, GREY } from '../assets/colors/colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

export const Main = () => (
  <Stack.Navigator
    initialRouteName="Main"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen
      name="Main"
      component={MainTabs}
      options={{ title: 'Main' }}
    />
    <Stack.Screen name="QuestionDetails" component={QuestionDetailsScreen} />
    <Stack.Screen name="EditorScreen" component={EditorScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: DEEP_GREEN,
      showIcon: true,
      style: { backgroundColor: 'white' },
      showLabel: false,
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
        let fontsize;
        let colorName;
        let style;
        const SELECTED_ICON_SIZE = 40;
        const NOT_SELECTED_ICON_SIZE = 34;
        if (route.name === 'Home') {
          iconName = 'home';
          fontsize = focused ? SELECTED_ICON_SIZE : NOT_SELECTED_ICON_SIZE;
          colorName = focused ? DEEP_GREEN : GREY;
        } else if (route.name === 'Activity') {
          iconName = 'done-all';
          fontsize = focused ? SELECTED_ICON_SIZE : NOT_SELECTED_ICON_SIZE;
          colorName = focused ? DEEP_GREEN : GREY;
        } else if (route.name === 'Search') {
          iconName = 'search';
          fontsize = focused ? SELECTED_ICON_SIZE : NOT_SELECTED_ICON_SIZE;
          colorName = focused ? DEEP_GREEN : GREY;
          style = { transform: [{ rotateY: '180deg' }] };
        } else {
          iconName = 'person';
          fontsize = focused ? SELECTED_ICON_SIZE : NOT_SELECTED_ICON_SIZE;
          colorName = focused ? DEEP_GREEN : GREY;
        }

        return (
          <Icon
            name={iconName}
            type="material"
            color={colorName}
            size={fontsize}
            iconStyle={style}
            containerStyle={{ width: 45 }}
          />
        );
      },
    })}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Activity" component={ActivityTopTab} />
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

export const ActivityTopTab = () => (
  <>
    <TopTab.Navigator
      initialRouteName="Questions"
      tabBarOptions={{
        activeTintColor: DEEP_GREEN,
        inactiveTintColor: GREY,
        labelStyle: { fontSize: 15, letterSpacing: 1, fontWeight: 'bold' },
        indicatorStyle: { backgroundColor: DEEP_GREEN },
      }}
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
      }}>
      <TopTab.Screen name="Questions" component={QuestionActivityScreen} />
      <TopTab.Screen name="Answers" component={AnswerActivityScreen} />
    </TopTab.Navigator>
  </>
);
