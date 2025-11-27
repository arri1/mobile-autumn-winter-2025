import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";

export default function ProfileScreen() {
    const { currentUser, logout, deleteAccount } = useAuthStore();
    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.title}>Текущая сессия</Text>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Имя:</Text>
                    <Text style={styles.value}>{currentUser?.name}</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Логин:</Text>
                    <Text style={styles.value}>{currentUser?.username}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Button title="Выйти из аккаунта" onPress={logout} />
                    <View style={styles.spacer} />
                    {currentUser?.username != "admin" ? (
                        <Button
                            title="Удалить аккаунт"
                            onPress={deleteAccount}
                            color="red"
                        />
                    ) : null}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
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
        borderBottomColor: "#eee",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
    },
    buttonsContainer: {
        marginTop: 40,
        marginBottom: 30,
    },
    spacer: {
        height: 15,
    },
});
