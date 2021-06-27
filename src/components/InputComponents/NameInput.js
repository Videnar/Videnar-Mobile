import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { GREY, LIGHT_GREEN } from '../../assets/colors/colors';

const NameInput = ({ name, setName, hasError, setHasError }) => {
  const [nameFocus, setNameFocus] = useState(false);

  const onEditName = (text) => {
    if (hasError) {
      setHasError((prevState) => ({ ...prevState, name: false }));
    }
    setName(text);
  };

  return (
    <>
      {hasError ? (
        <Input
          placeholder="your name"
          leftIcon={<Icon name="person" size={24} color={GREY} />}
          value={name}
          onChangeText={onEditName}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          inputContainerStyle={nameFocus ? styles.focused : styles.notFocused}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          errorMessage="Name field is required"
          errorStyle={styles.errorText}
        />
      ) : (
        <Input
          placeholder="your full name"
          leftIcon={<Icon name="person" size={24} color={GREY} />}
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          inputContainerStyle={nameFocus ? styles.focused : styles.notFocused}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
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

export default NameInput;
