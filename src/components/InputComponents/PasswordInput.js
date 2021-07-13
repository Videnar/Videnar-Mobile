import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { DEEP_GREEN, GREY, LIGHT_GREEN } from '../../assets/colors/colors';
import LockIcon from '../../utilities/Icons/LockIcon';

const PasswordInput = ({ password, setPassword, hasError, setHasError }) => {
  const [pwdFocus, setPwdFocus] = useState(false);

  const onEditPassword = (text) => {
    if (hasError) {
      setHasError((prevState) => ({ ...prevState, password: false }));
    }
    setPassword(text);
  };

  return (
    <>
      {hasError ? (
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<LockIcon size={20} color={DEEP_GREEN} />}
          value={password}
          onChangeText={onEditPassword}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={pwdFocus ? styles.focused : styles.notFocused}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          errorMessage="Password field is required"
          errorStyle={styles.errorText}
        />
      ) : (
        <Input
          secureTextEntry={true}
          placeholder="password"
          leftIcon={<LockIcon size={20} color={DEEP_GREEN} />}
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
  errorText: {
    letterSpacing: 0.5,
  },
});

export default PasswordInput;
