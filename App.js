import React, {useState, useEffect} from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  NavigationActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Auth, Hub} from 'aws-amplify';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import QuestionDetailsScreen from './src/screens/QuestionDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AskQuestionScreen from './src/screens/AskQuestionScreen';
import {setNavigator} from './src/navigations/navigationRef';

const checkAuth = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (err) {
    return false;
  }
};

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
    loginFlow: createStackNavigator({
      Signup: SignupScreen,
      Signin: SigninScreen,
    }),
    mainFlow: createBottomTabNavigator({
      Home: Main,
      Activity: ActivityScreen,
      Profile: ProfileScreen,
    }),
  },
  {
    initialRouteName: 'loginFlow',
  },
);

const AppContent = createAppContainer(switchNavigator);

const App = () => {
  // let [user, setUser] = useState(null);

  // useEffect(() => {
  //   let updateUser = async (authState) => {
  //     try {
  //       let user = await Auth.currentAuthenticatedUser();
  //       setUser(user);
  //     } catch {
  //       setUser(null);
  //     }
  //   };
  //   Hub.listen('auth', updateUser); // listen for login/signup events
  //   updateUser(); // check manually the first time because we won't get a Hub event
  //   return () => Hub.remove('auth', updateUser); // cleanup
  // }, []);

  return (
    <AppContent
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    />
  );
};
// class App extends React.Component {

//   render() {
//     return (
//       <AppContent
//         ref={(navigator) => {
//           setNavigator(navigator);
//         }}
//         onNavigationStateChange={this.checkAuth}
//       />
//     );
//   }
// }

export default App;
