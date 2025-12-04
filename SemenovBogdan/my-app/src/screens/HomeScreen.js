import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../shared/Header';
import { useTheme } from '../theme/useTheme';

export default function HomeScreen() {
	const { colors } = useTheme();
	return (
	<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
		<Header title="Главная" />
		<View style={styles.content}>
			<Text>Добро пожаловать в приложение!</Text>
		</View>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { flex: 1, padding: 16 },
});