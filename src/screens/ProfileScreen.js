import React, {useContext} from 'react';
import {Button, Text, View} from 'react-native';
import {Context as AuthContext} from '../contexts/AuthContext';

const ProfileScreen = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Profile!</Text>
      <Button onPress={() => signOut()} title="Sign Out" />
    </View>
  );
};

export default ProfileScreen;
