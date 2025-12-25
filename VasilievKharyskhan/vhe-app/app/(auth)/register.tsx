import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import useAuthStore from '@/store/authStore';
import { useThemeColor } from '@/hooks/use-theme-color';
import { MyAlert } from "@/components/GlobalAlert";

export default function RegisterScreen() {
    const router = useRouter();
    const { login, register, isLoading } = useAuthStore();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const primaryColor = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
    const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'input');
    const textColor = useThemeColor({ light: '#000', dark: '#FFF' }, 'text');
    const placeholderColor = '#999';

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            MyAlert.show("Ошибка", "Заполните все поля");
            return;
        }
        if (password !== confirmPassword) {
            MyAlert.show("Ошибка", "Пароли не совпадают");
            return;
        }
        try {
            await register({ name, email, password });
            await login({ email, password });
            MyAlert.show('Успех', 'Регистрация прошла успешно!');
        } catch (error) {
            MyAlert.show("Ошибка", error.message || 'Не удалось зарегистрироваться');
        }
    };

    const handleDemoFill = () => {
        setName('Демо Пользователь');
        setEmail('demo@example.com');
        setPassword('demo123');
        setConfirmPassword('demo123');
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }}
        >
            <ThemedView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    
                    <View style={styles.headerContainer}>
                        <View style={[styles.logoContainer, { backgroundColor: primaryColor }]}>
                            <Ionicons name="person-add-outline" size={36} color="#FFF" />
                        </View>
                        <ThemedText type="title" style={styles.headerTitle}>Создать аккаунт</ThemedText>
                        <ThemedText style={styles.headerSubtitle}>Присоединяйтесь к нам!</ThemedText>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Name */}
                        <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                            <Ionicons name="person-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Имя"
                                placeholderTextColor={placeholderColor}
                            />
                        </View>

                        {/* Email */}
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

                        {/* Password */}
                        <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Пароль (мин. 6 символов)"
                                placeholderTextColor={placeholderColor}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={placeholderColor} />
                            </TouchableOpacity>
                        </View>

                         {/* Confirm Password */}
                         <View style={[styles.inputContainer, { backgroundColor: inputBg }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={placeholderColor} style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { color: textColor }]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Повторите пароль"
                                placeholderTextColor={placeholderColor}
                                secureTextEntry={!showPassword}
                            />
                        </View>

                        <TouchableOpacity 
                            style={[styles.primaryButton, { backgroundColor: primaryColor, opacity: isLoading ? 0.7 : 1 }]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            <ThemedText style={styles.primaryButtonText}>
                                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.secondaryButton}
                            onPress={handleDemoFill}
                        >
                            <ThemedText style={[styles.secondaryButtonText, { color: primaryColor }]}>
                                Заполнить демо
                            </ThemedText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footerContainer}>
                        <ThemedText style={styles.footerText}>Уже есть аккаунт?</ThemedText>
                        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                            <ThemedText style={[styles.linkText, { color: primaryColor }]}>Войти</ThemedText>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </ThemedView>
        </KeyboardAvoidingView>
    );
}