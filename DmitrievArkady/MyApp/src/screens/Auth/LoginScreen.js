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

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const login = useAuthStore((state) => state.login);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Ошибка", "Заполните все поля");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Ошибка", "Введите корректный email");
            return;
        }

        setIsLoading(true);
        
        try {
            const result = await login(email, password);
            
            if (!result.success) {
                Alert.alert("Ошибка", result.error || "Неверный email или пароль");
            }
        } catch (error) {
            Alert.alert("Ошибка", "Что-то пошло не так. Попробуйте снова.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegisterNavigation = () => {
        navigation.navigate("Register");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>

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
                autoComplete="password"
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
            ) : (
                <>
                    <Button 
                        title="Войти" 
                        onPress={handleLogin} 
                        disabled={isLoading}
                    />
                </>
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
    registerButton: {
        marginTop: 20,
        padding: 15,
        alignItems: "center",
    },
    registerText: {
        color: "#0066cc",
        fontSize: 16,
        textDecorationLine: "underline",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
});