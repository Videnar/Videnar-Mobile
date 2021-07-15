import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { DEEP_GREEN, GREY, LIGHT_GREEN } from '../../assets/colors/colors';
import MailIcon from '../../utilities/Icons/MailIcon';

const EmailInput = ({ email, setEmail, hasError, setHasError }) => {
  const [emailFocus, setEmailFocus] = useState(false);

  const onEditMail = (text) => {
    if (hasError) {
      setHasError((prevState) => ({ ...prevState, email: false }));
    }
    setEmail(text);
  };

  return (
    <>
      {hasError ? (
        <Input
          placeholder="email@address.com"
          leftIcon={<MailIcon size={20} color={DEEP_GREEN} />}
          value={email}
          onChangeText={onEditMail}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.textInput}
          inputContainerStyle={emailFocus ? styles.focused : styles.notFocused}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          errorMessage="Enter a valid email address"
          errorStyle={styles.errorText}
        />
      ) : (
        <Input
          placeholder="email@address.com"
          leftIcon={<MailIcon size={20} color={DEEP_GREEN} />}
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
  errorText: {
    letterSpacing: 0.5,
  },
});

export default EmailInput;
