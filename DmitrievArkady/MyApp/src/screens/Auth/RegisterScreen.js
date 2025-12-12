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
import { useAuthStore } from "../../store/useAuthStore";

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(""); // Изменено с username на email
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const register = useAuthStore((state) => state.register);
    const login = useAuthStore((state) => state.login);

    const handleRegister = async () => {
        // Валидация полей
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            Alert.alert("Ошибка", "Пароли не совпадают");
            return;
        }

        // Проверка минимальной длины пароля
        if (password.length < 6) {
            Alert.alert("Ошибка", "Пароль должен быть не менее 6 символов");
            return;
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Ошибка", "Введите корректный email");
            return;
        }

        setIsLoading(true);
        
        try {
            // Регистрируем пользователя
            const registerResult = await register(name, email, password);
            
            if (registerResult.success) {
                // Автоматически логинимся после успешной регистрации
                const loginResult = await login(email, password);
                
                if (loginResult.success) {
                    // Успешная регистрация и вход - навигация произойдет автоматически
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
                placeholder="Пароль (мин. 6 символов)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password-new"
            />

            <TextInput
                style={styles.input}
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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

            <TouchableOpacity 
                onPress={() => navigation.navigate("Login")}
                style={styles.loginLink}
            >
                <Text style={styles.loginText}>
                    Уже есть аккаунт? Войти
                </Text>
            </TouchableOpacity>
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