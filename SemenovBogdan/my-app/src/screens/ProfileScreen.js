import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
	const { user, logout } = useAuth();

	return (
		<View style={styles.container}>
			<View style={styles.avatarBox}>
                <Ionicons name="person" size={48} color={theme.colors.card} />
            </View>

            <Text style={styles.name}>
                {user?.name || 'Без имени'}
            </Text>

            <Text style={styles.email}>
                {user?.email}
            </Text>

			<TouchableOpacity style={styles.logoutButton} onPress={logout}>
				<Text style={styles.logoutText}>Выйти из аккаунта</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40,
        backgroundColor: theme.colors.background,
    },
    avatarBox: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.text,
    },
    email: {
        fontSize: 14,
        color: theme.colors.muted,
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 32,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.danger,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});