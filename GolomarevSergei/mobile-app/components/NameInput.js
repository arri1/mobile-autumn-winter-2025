import React from "react";
import { TextInput, StyleSheet } from "react-native";

const NameInput = ({value, onChangeText}) => (
    <TextInput
        style = {styles.input}
        placeholder = 'Ваше имя'
        value = {value}
        onChangeText = {onChangeText}
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});

export default NameInput