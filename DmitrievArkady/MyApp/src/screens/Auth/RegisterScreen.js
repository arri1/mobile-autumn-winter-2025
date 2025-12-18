import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    Button, 
    StyleSheet, 
    Alert,
    TouchableOpacity,
    ActivityIndicator 
} from "react-native";
import { useAuthStore } from "../../stores/useAuthStore";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Изменено с username на email
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const register = useAuthStore((state) => state.register);
    const login = useAuthStore((state) => state.login);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Ошибка", "Пароль должен быть не менее 6 символов");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Ошибка", "Введите корректный email");
            return;
        }

        setIsLoading(true);
        
        try {
            const registerResult = await register(name, email, password);
            
            if (registerResult.success) {
                const loginResult = await login(email, password);
                
                if (loginResult.success) {
                    Alert.alert("Успешно!", "Регистрация прошла успешно");
                } else {
                    Alert.alert("Ошибка", "Регистрация прошла, но не удалось войти");
                }
            } else {
                Alert.alert("Ошибка регистрации", registerResult.error || "Email уже занят");
            }
        } catch (error) {
            console.error("Register error:", error);
            Alert.alert("Ошибка", "Что-то пошло не так. Попробуйте снова.");
        } finally {
            setIsLoading(false);
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
                autoCapitalize="words"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
            />

            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password-new"
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <Button 
                    title="Зарегистрироваться" 
                    onPress={handleRegister} 
                    disabled={isLoading}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 40,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    loader: {
        marginVertical: 20,
    },
    loginLink: {
        marginTop: 20,
        padding: 15,
        alignItems: "center",
    },
    loginText: {
        color: "#0066cc",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 14,
    },
});