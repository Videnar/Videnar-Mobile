import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {Auth} from 'aws-amplify';
import {connect} from 'react-redux';
import AuthComponent from '../components/AuthComponent';
import actions from '../reduxStore/actions';
import NavLink from '../components/NavLink';
import SocialAuth from '../components/SocialAuth';

const SigninScreen = ({navigation}) => {
  const signIn = async (email, password) => {
    try {
      const user = await Auth.signIn({
        username: email,
        password,
        attributes: {email},
      });
      console.log(user);
      navigation.navigate('Home');
    } catch (error) {
      console.log('error signing in', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <NavigationEvents onWillBlur={clearErrorMessage} /> */}
      <AuthComponent
        headerText="Sign into Your Account"
        // errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      />
      <SocialAuth />
    </View>
  );
};
SigninScreen.navigationOptions = {
  header: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 250,
  },
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    // foods: state.foodReducer.foodList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // add: (food) => dispatch(food),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninScreen);
