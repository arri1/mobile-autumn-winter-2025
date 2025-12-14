import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUserStore } from '../../store/useUserStore';
import { User } from '../../store/useUserStore';

export default function UsersScreen() {
    const { getUsers } = useUserStore();
    
    const [users, setUsers] = useState<User[]>([]);

    // Загрузка пользователей
    const loadUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
            
        } catch (error) {
            console.error('Ошибка загрузки пользователей:', error);
        }
    };

    // Первоначальная загрузка
    useEffect(() => {
        loadUsers();
    }, []);

    // Форматирование даты
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Tokyo'
        });
    };

    // Рендер элемента списка
    const renderUserItem = (index: number, user: User) => (
        <View key={index} style={styles.userItem}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text>Почта: {user.email}</Text>
            <Text>Роль: {user.role}</Text>
            <Text>Создан: {formatDate(user.createdAt)}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Пользователи</Text>
            {users.map((user, index) => renderUserItem(index, user) )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    userItem: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    }
});