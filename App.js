import React, {useReducer, useEffect, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/LoadingScreen';
import {navigationRef, isReadyRef} from './src/navigation/RootNavigation';
import {AuthContext} from './src/contexts/AuthContext';
import {
  Main,
  Auth as AuthComponent,
  UserInfo,
} from './src/navigation/Navigators';
import {AuthReducer, initialState} from './src/contexts/AuthReducer';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let jsonValue;
      try {
        jsonValue = await AsyncStorage.getItem('@user');
        jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (jsonValue !== null) {
        dispatch({type: 'signin', payload: jsonValue});
      }
    };
    bootstrapAsync();
  }, []);

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  const AuthContextValue = useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          await Auth.signIn({
            username: email,
            password,
            attributes: {email},
          });
          Auth.currentAuthenticatedUser()
            .then(({attributes}) =>
              dispatch({type: 'signin', payload: attributes}),
            )
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('error signing in', error);
        }
      },
      signOut: async () => {
        Auth.signOut()
          .then(() => {
            AsyncStorage.removeItem('@user');
            dispatch({type: 'signout'});
          })
          .catch((err) => console.log(err, 'err'));
      },

      signUp: async (email, password) => {
        try {
          await Auth.signUp({
            username: email,
            password,
            attributes: {
              email,
            },
          });
          Auth.currentAuthenticatedUser()
            .then(({attributes}) =>
              dispatch({type: 'signin', payload: attributes}),
            )
            .catch((err) => console.log(err));
        } catch (error) {
          console.log('error signing up:', error);
        }
      },
      updateUserPreferences: async (preferences) => {
        let user = await Auth.currentAuthenticatedUser();
        let result = await Auth.updateUserAttributes(user, {
          'custom:preferences': JSON.stringify(preferences),
        })
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
        dispatch({type: 'update_preferences', payload: preferences});
        console.log(result, 'result');
      },
      socialAuth: async (provider) => {
        Auth.federatedSignIn({provider});
        Auth.currentAuthenticatedUser()
          .then(({attributes}) => {
            dispatch({type: 'signin', payload: attributes});
            const jsonValue = JSON.stringify(attributes);
            AsyncStorage.setItem('@user', jsonValue);
          })
          .catch((err) => console.log(err));
      },
      changePassword: (oldPassword, newPassword) => {
        try {
          Auth.currentAuthenticatedUser()
            .then((user) => {
              return Auth.changePassword(user, oldPassword, newPassword);
            })
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{state, ...AuthContextValue}}>
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
          {state.attributes ? (
            state.attributes['custom:preferences'] ? (
              <Stack.Screen name="Main" component={Main} />
            ) : (
              <Stack.Screen name="UserInfo" component={UserInfo} />
            )
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthComponent} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
