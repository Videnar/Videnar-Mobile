import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { GREY, LIGHT_GREEN } from '../../assets/colors/colors';

const PasswordInput = ({ hasError, password, setPassword }) => {
  const [pwdFocus, setPwdFocus] = useState(false);

  return (
    <>
      {hasError ? (
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<Icon name="lock" size={24} color={GREY} />}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={pwdFocus ? styles.focused : styles.notFocused}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          errorMessage="Password Can't be Empty"
        />
      ) : (
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<Icon name="lock" size={24} color={GREY} />}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={pwdFocus ? styles.focused : styles.notFocused}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
  },
  notFocused: {
    borderColor: 'grey',
  },
  focused: {
    borderColor: LIGHT_GREEN,
  },
});

export default PasswordInput;
