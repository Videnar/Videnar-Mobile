import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ActivityScreen from '../screens/ActivityScreen';
import QuestionDetailsScreen from '../screens/QuestionDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditorScreen from '../screens/EditorScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    <Tab.Screen name="Home" component={HomeScreen} />
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
