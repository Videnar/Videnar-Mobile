import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { DEEP_GREEN } from '../assets/colors/colors.js';
import * as RootNavigation from '../navigation/RootNavigation.js';

const NavLink = ({ text, routeName }) => {
  return (
    <Pressable onPress={() => RootNavigation.navigate(routeName)}>
      <Text style={styles.link}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    color: DEEP_GREEN,
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default NavLink;
