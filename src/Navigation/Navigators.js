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
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
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
      style: {backgroundColor: '#121212'},
      showLabel: false,
    }}
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        let fontsize;
        let colorName;
        if (route.name === 'Home') {
          iconName = 'home';
          fontsize = focused ? 30 : 25;
          colorName = focused ? '#eb4034' : 'white';
        } else if (route.name === 'Activity') {
          iconName = 'history';
          fontsize = focused ? 30 : 25;
          colorName = focused ? '#eb4034' : 'white';
        } else if (route.name === 'Search') {
          iconName = 'search';
          fontsize = focused ? 30 : 25;
          colorName = focused ? '#eb4034' : 'white';
        } else {
          iconName = 'user';
          fontsize = focused ? 30 : 25;
          colorName = focused ? '#eb4034' : 'white';
        }

        return (
          <Icon
            name={iconName}
            type="FontAwesome"
            style={{fontSize: fontsize, color: colorName}}
          />
        );
      },
    })}>
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Activity" component={ActivityScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
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
