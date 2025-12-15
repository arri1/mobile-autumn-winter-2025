import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function ProfileScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ProfileScreen</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		justifyContent: 'center',
		alignItems: 'center',
		padding: theme.spacing.lg,
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
	subtitle: {
		fontSize: 16,
		color: theme.colors.muted,
	},
});