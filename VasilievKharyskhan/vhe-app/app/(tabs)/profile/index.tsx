import React from "react";
import { Alert, ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Добавляем иконки

import useAuthStore from "@/store/authStore";
import { styles } from "./_styles";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
    const { actualColorScheme, toggleTheme } = useTheme();
    // Цвета для UI элементов
    const iconColor = useThemeColor({ light: '#8E8E93', dark: '#9BA1A6' }, 'text');
    const dangerColor = '#FF3B30';
    const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

    const router = useRouter();
    const { user, logout, isLoading } = useAuthStore();

    // Функция для получения инициалов
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const handleLogout = async () => {
        Alert.alert("Выход", "Вы уверены, что хотите выйти из аккаунта?", [
            { text: "Отмена", style: "cancel" },
            {
                text: "Выйти",
                style: "destructive",
                onPress: async () => {
                    try {
                        await logout();
                        router.replace("/(tabs)");
                    } catch (error) {
                        Alert.alert("Ошибка", "Не удалось выйти");
                    }
                },
            },
        ]);
    };

    if (isLoading) {
        return (
            <ThemedView style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </ThemedView>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 1. Шапка профиля (Аватар + Имя) */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <ThemedText style={styles.avatarText}>
                            {getInitials(user?.name)}
                        </ThemedText>
                    </View>
                    <ThemedText style={styles.userName}>{user?.name || "Пользователь"}</ThemedText>
                    <View style={styles.roleBadge}>
                        <ThemedText style={styles.roleText}>{user?.role || "GUEST"}</ThemedText>
                    </View>
                </View>

                {/* 2. Секция информации */}
                <ThemedText style={styles.sectionHeader}>Личные данные</ThemedText>
                <View style={[styles.card, { backgroundColor: cardBg }]}>
                    
                    {/* Email Row */}
                    <View style={styles.row}>
                        <View style={styles.rowIcon}>
                            <Ionicons name="mail-outline" size={20} color={iconColor} />
                        </View>
                        <View style={styles.rowContent}>
                            <ThemedText style={styles.rowLabel}>Email</ThemedText>
                            <ThemedText style={styles.rowValue}>{user?.email || "Не указан"}</ThemedText>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* ID Row */}
                    <View style={styles.row}>
                        <View style={styles.rowIcon}>
                            <Ionicons name="finger-print-outline" size={20} color={iconColor} />
                        </View>
                        <View style={styles.rowContent}>
                            <ThemedText style={styles.rowLabel}>ID пользователя</ThemedText>
                            <ThemedText style={styles.rowValue} numberOfLines={1} ellipsizeMode="middle">
                                {user?.id || "N/A"}
                            </ThemedText>
                        </View>
                        <TouchableOpacity onPress={() => Alert.alert("ID", user?.id)}>
                             <Ionicons name="copy-outline" size={18} color={iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 3. Настройки приложения */}
                <ThemedText style={styles.sectionHeader}>Настройки</ThemedText>
                <View style={[styles.card, { backgroundColor: cardBg }]}>
                    <TouchableOpacity 
                        style={styles.row} 
                        onPress={toggleTheme}
                        activeOpacity={0.7}
                    >
                        <View style={styles.rowIcon}>
                            <Ionicons 
                                name={actualColorScheme === 'dark' ? "moon" : "sunny"} 
                                size={22} 
                                color={actualColorScheme === 'dark' ? "#FFD700" : "#FDB813"} 
                            />
                        </View>
                        <View style={styles.rowContent}>
                            <ThemedText style={styles.rowLabel}>Тема оформления</ThemedText>
                            <ThemedText style={styles.rowValue}>
                                {actualColorScheme === 'dark' ? 'Темная' : 'Светлая'}
                            </ThemedText>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={iconColor} style={{opacity: 0.5}} />
                    </TouchableOpacity>
                </View>

                {/* 4. Кнопка выхода */}
                <TouchableOpacity 
                    style={[styles.logoutButton]} 
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Ionicons name="log-out-outline" size={20} color={dangerColor} />
                    <ThemedText style={[styles.logoutText, { color: dangerColor }]}>
                        Выйти из аккаунта
                    </ThemedText>
                </TouchableOpacity>

                <ThemedText style={styles.versionText}>Версия приложения 0.0.0.0.0.0.0.0.0.2</ThemedText>

            </ScrollView>
        </ThemedView>
    );
}