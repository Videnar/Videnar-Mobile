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
import HomeIcon from '../utilities/Icons/HomeIcon';
import ActivityIcon from '../utilities/Icons/ActivityIcon';
import SearchIcon from '../utilities/Icons/SearchIcon';
import AvatarIcon from '../utilities/Icons/AvatarIcon';

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
        let icon = null;
        let activeColorName = DEEP_GREEN;
        let defaultColorName = 'black';
        const ICON_SIZE = 32;
        if (route.name === 'Home') {
          icon = focused ? (
            <HomeIcon size={ICON_SIZE} color={activeColorName} />
          ) : (
            <HomeIcon size={ICON_SIZE} color={defaultColorName} />
          );
        } else if (route.name === 'Activity') {
          icon = focused ? (
            <ActivityIcon size={ICON_SIZE} color={activeColorName} />
          ) : (
            <ActivityIcon size={ICON_SIZE} color={defaultColorName} />
          );
        } else if (route.name === 'Search') {
          icon = focused ? (
            <SearchIcon size={ICON_SIZE} color={activeColorName} />
          ) : (
            <SearchIcon size={ICON_SIZE} color={defaultColorName} />
          );
        } else {
          icon = focused ? (
            <AvatarIcon size={ICON_SIZE} color={activeColorName} />
          ) : (
            <AvatarIcon size={ICON_SIZE} color={defaultColorName} />
          );
        }

        return (
          // <Icon
          //   name={iconName}
          //   type="material"
          //   color={colorName}
          //   size={fontsize}
          //   iconStyle={style}
          //   containerStyle={{ width: 45 }}
          // />
          <>{icon}</>
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
