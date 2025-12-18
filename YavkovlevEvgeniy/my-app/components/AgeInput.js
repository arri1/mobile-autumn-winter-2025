import React from "react";
import { TextInput, StyleSheet, Keyboard } from "react-native";

const AgeInput = ({value, onChangeText}) => (
    <TextInput
        style = {styles.input}
        placeholder = "Введите возраст"
        value = {value.toString()}
        onChangeText = {(text) => onChangeText(Number(text)||0)}
        keyboardType="numeric"  
        returnKeyType="done"  
        onSubmitEditing={() => Keyboard.dismiss()}
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

export default AgeInput