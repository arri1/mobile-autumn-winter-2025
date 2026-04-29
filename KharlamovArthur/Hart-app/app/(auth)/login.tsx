import React, { useState } from "react";
import { Text,
    View, 
    KeyboardAvoidingView, 
    Platform, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    StyleSheet, 
    Alert} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import useAuthStore from "@/store/authStore";

export default function LoginScreen() {
    // Цвета темы
    const router = useRouter();
    const { login, isLoading } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Цвета
    const placeholderColor = '#d1bebe';

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert("Пустые эмейл или пароль");
            return;
        }
        try {
            await login({ email, password });
            Alert.alert("Вы вошли");
            // Редирект сработает автоматически в _layout
        } catch (error) {
            Alert.alert("Ошибка при логине");
            console.log(error);
        }
    };

    const handleDemoLogin = () => {
        setEmail("demo@example.com");
        setPassword("demo123");
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Header with Icon */}
                    <View style={styles.headerContainer}>
                        <View style={[styles.logoContainer]}>
                            <Ionicons name="log-in-outline" size={40} color="#FFF" />
                        </View>
                        <Text style={styles.title}>С возвращением!</Text>
                        <Text style={styles.subtitle}>Войдите, чтобы продолжить</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.formContainer}>
                        
                        {/* Email Input */}
                        <View style={[styles.inputContainer]}>
                            <Ionicons name="mail-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                placeholderTextColor={placeholderColor}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={[styles.inputContainer]}>
                            <Ionicons name="lock-closed-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input]}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Пароль"
                                placeholderTextColor={placeholderColor}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={placeholderColor} />
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity 
                            style={[styles.primaryButton, {  opacity: isLoading ? 0.7 : 1 }]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isLoading ? "Вход..." : "Войти"}
                            </Text>
                        </TouchableOpacity>

                        {/* Demo Button */}
                        <TouchableOpacity 
                            style={styles.secondaryButton}
                            onPress={handleDemoLogin}
                            disabled={isLoading}
                        >
                            <Text style={[styles.secondaryButtonText]}>
                                Заполнить демо данные
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Нет аккаунта?</Text>
                        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                            <Text style={[styles.linkText]}>Зарегистрироваться</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    
    // --- Header ---
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // Тень
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fffffe',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        color: '#94a1b2',
        textAlign: 'center',
    },

    // --- Form ---
    formContainer: {
        width: '100%',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56, // Высокие поля ввода выглядят современно
        marginBottom: 16,
        backgroundColor: '#2A2A35',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        color:'#ffff',
        flex: 1,
        fontSize: 16,
        height: '100%',
    },

    // --- Buttons ---
    primaryButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 12,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    secondaryButton: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
    },

    // --- Footer ---
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#fffffe',
        fontSize: 14,
        opacity: 0.6,
        marginRight: 6,
    },
    linkText: {
        color: '#fffffe',
        fontSize: 14,
        fontWeight: 'bold',
    },
});