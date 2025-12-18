import React from "react";
import { View, Button, StyleSheet } from "react-native";

const HobbyButtons = ({ onAddHobby }) => {
    return (
        <View style={styles.buttonRow}>
            <Button title="Добавить чтение" onPress={() => onAddHobby("Чтение")} />
            <Button title="Добавить бег" onPress={() => onAddHobby("Бег")} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default HobbyButtons