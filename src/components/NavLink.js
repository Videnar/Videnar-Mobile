import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import * as RootNavigation from '../navigation/RootNavigation.js';
import { YELLOW } from '../assets/colors/colors';

const NavLink = ({ text, routeName }) => {
  return (
    <Pressable onPress={() => RootNavigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    color: YELLOW,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NavLink;
