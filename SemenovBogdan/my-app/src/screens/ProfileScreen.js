import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../shared/Header';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/useTheme';

export default function ProfileScreen() {
	const { signOut } = useAuth();
	const { colors } = useTheme();

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
			<Header title="Профиль" />
			<View style={styles.content}>
				<Text>Профиль пользователя</Text>
				<TouchableOpacity onPress={signOut} style={[styles.btn, { backgroundColor: colors.primary }]}> 
					<Text style={{ color: '#fff' }}>Выйти</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({ container: { flex: 1 }, content: { flex: 1, padding: 16 }, btn: { marginTop: 16, padding: 12, borderRadius: 10, alignItems: 'center' } });