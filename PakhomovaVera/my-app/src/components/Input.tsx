import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export const Input: React.FC<TextInputProps> = (props) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginVertical: 5,
    backgroundColor: 'white',
  },
});