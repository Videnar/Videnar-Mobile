import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { GREY, LIGHT_GREEN } from '../../assets/colors/colors';

const NameInput = ({ hasError, name, setName }) => {
  const [nameFocus, setNameFocus] = useState(false);

  return (
    <>
      {hasError ? (
        <Input
          placeholder="your name"
          leftIcon={<Icon name="person" size={24} color={GREY} />}
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textInput}
          inputContainerStyle={nameFocus ? styles.focused : styles.notFocused}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          errorMessage="Name can't be Empty"
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
});

export default NameInput;
