import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useUserStore } from "../../store/useUserStore";
import { User } from "../../store/useUserStore";

export default function ProfileScreen() {
    const { currentUser, logout, getProfile, getUsers } = useUserStore();
    const [users, setUsers] = useState<User[]>([]);

    const loadUsers = async () => {
        try {
            const users = await getUsers();
            setUsers(users);
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Обновляем профиль при открытии экрана
        getProfile();
        loadUsers();
    }, []);

    //Форматирование даты
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Tokyo'
        });
    };

    const renderUser = (index: number, user: User) => (
        <View key={index} style={styles.userItem}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text>Почта: {user.email}</Text>
            <Text>Роль: {user.role}</Text>
            <Text>Создан: {formatDate(user.createdAt)}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.title}>Текущая сессия</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Имя:</Text>
                    <Text style={styles.value}>{currentUser?.name}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Почта:</Text>
                    <Text style={styles.value}>{currentUser?.email}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Роль:</Text>
                    <Text style={styles.value}>{currentUser?.role}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Создан:</Text>
                    <Text style={styles.value}>{formatDate(currentUser?.createdAt)}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button title="Выйти из аккаунта" onPress={logout} />
                </View>
            </View>
            <View style={styles.spacer} />
            <Text style={styles.title}>Пользователи</Text>
            {users.map((user, index) => renderUser(index, user) )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
    },
    container: {
        flex: 1,
    },
    profileContainer: {
        backgroundColor: '#e4e4e4ff',
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#c4c4c4ff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
    },
    buttonsContainer: {
        marginTop: 40
    },
    spacer: {
        height: 40,
    },
});
