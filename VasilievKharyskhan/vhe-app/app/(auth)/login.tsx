import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import useAuthStore from "@/store/authStore";
import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { MyAlert } from "@/components/GlobalAlert";
import { useThemeColor } from '@/hooks/use-theme-color';

export default function LoginScreen() {
    // Цвета темы
    const router = useRouter();
    const { login, isLoading } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Цвета
    const primaryColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
    const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'input');
    const textColor = useThemeColor({ light: '#000', dark: '#FFF' }, 'text');
    const placeholderColor = '#999';

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            MyAlert.show("Ошибка", "Заполните все поля");
            return;
        }
        try {
            await login({ email, password });
            // Редирект сработает автоматически в _layout
        } catch (error) {
            MyAlert.show("Ошибка", error instanceof Error ? error.message : "Не удалось войти");
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
            <ThemedView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    {/* Header with Icon */}
                    <View style={styles.headerContainer}>
                        <View style={[styles.logoContainer, { backgroundColor: primaryColor }]}>
                            <Ionicons name="log-in-outline" size={40} color="#FFF" />
                        </View>
                        <ThemedText type="title" style={styles.headerTitle}>С возвращением!</ThemedText>
                        <ThemedText style={styles.headerSubtitle}>Войдите, чтобы продолжить</ThemedText>
                    </View>

                    {/* Form Card */}
                    <View style={styles.formContainer}>
                        
                        {/* Email Input */}
                        <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                            <Ionicons name="mail-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                placeholderTextColor={placeholderColor}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
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
                            style={[styles.primaryButton, { backgroundColor: primaryColor, opacity: isLoading ? 0.7 : 1 }]}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <ThemedText style={styles.primaryButtonText}>
                                {isLoading ? "Вход..." : "Войти"}
                            </ThemedText>
                        </TouchableOpacity>

                        {/* Demo Button */}
                        <TouchableOpacity 
                            style={styles.secondaryButton}
                            onPress={handleDemoLogin}
                            disabled={isLoading}
                        >
                            <ThemedText style={[styles.secondaryButtonText, { color: primaryColor }]}>
                                Заполнить демо данные
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footerContainer}>
                        <ThemedText style={styles.footerText}>Нет аккаунта?</ThemedText>
                        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                            <ThemedText style={[styles.linkText, { color: primaryColor }]}>Зарегистрироваться</ThemedText>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}