import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const register = useAuthStore((state) => state.register);
    const login = useAuthStore((state) => state.login);

    const handleRegister = async () => {
        if (!name || !username || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        const success = await register(name, username, password);
        if (success) {
            login(username, password);
        } else {
            Alert.alert("Ошибка", "Логин уже занят");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>

            <TextInput
                style={styles.input}
                placeholder="Имя"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Логин"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Зарегистрироваться" onPress={handleRegister} />
            <View style={styles.spacer} />
            <Button
                title="Назад"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        padding: 15,
        marginBottom: 15,
    },
    spacer: {
        height: 15,
    },
});
