import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useUserStore } from "../../store/useUserStore";

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUserStore();


    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }
        await login(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>

            <TextInput
                style={styles.input}
                placeholder="Почта"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Войти" onPress={handleLogin} />
            <View style={styles.spacer} />
            <Button
                title="Регистрация"
                onPress={() => navigation.navigate("Register")}
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
