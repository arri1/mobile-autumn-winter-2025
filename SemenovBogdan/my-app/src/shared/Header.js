import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

export default function Header({ title }) {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.card }]}> 
			<Text style={[styles.title, { color: colors.text }]}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
	title: { fontSize: 18, fontWeight: '700' },
});