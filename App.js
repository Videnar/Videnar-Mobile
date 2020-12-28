import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import QuestionDetailsScreen from './src/screens/QuestionDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AskQuestionScreen from './src/screens/AskQuestionScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import SelectEducationScreen from './src/screens/SelectEducationScreen';
import SelectBranchScreen from './src/screens/SelectBranchScreen';
import SelectExamsScreen from './src/screens/SelectExamsScreen';
import {navigationRef, isReadyRef} from './src/RootNavigation';
import {Provider as AuthProvider} from './src/contexts/AuthContext';

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

const Main = () => (
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
          <MaterialIcons name="home" color={'#e91e63'} size={32} />
        ),
      }}
    />
    <Tab.Screen
      name="Activity"
      component={ActivityScreen}
      options={{
        tabBarIcon: ({}) => (
          <MaterialIcons name="history" color={'#e91e63'} size={32} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchScreen}
      options={{
        tabBarIcon: ({}) => (
          <MaterialIcons name="search" color={'#e91e63'} size={32} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({}) => (
          <MaterialIcons name="person" color={'#e91e63'} size={32} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);
  return (
    <AuthProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <Stack.Navigator
          initialRouteName="Signin"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name="SelectEducation"
            component={SelectEducationScreen}
          />
          <Stack.Screen name="SelectBranch" component={SelectBranchScreen} />
          <Stack.Screen name="SelectExams" component={SelectExamsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
