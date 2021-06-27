import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { GREY, LIGHT_GREEN } from '../../assets/colors/colors';

const EmailInput = ({ hasError, email, setEmail }) => {
  const [emailFocus, setEmailFocus] = useState(false);

  return (
    <>
      {hasError ? (
        <Input
          placeholder="email@address.com"
          leftIcon={<Icon name="email" size={24} color={GREY} />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={emailFocus ? styles.focused : styles.notFocused}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          errorMessage="Enter a Valid Email"
        />
      ) : (
        <Input
          placeholder="email@address.com"
          leftIcon={<Icon name="email" size={24} color={GREY} />}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={emailFocus ? styles.focused : styles.notFocused}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
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

export default EmailInput;
