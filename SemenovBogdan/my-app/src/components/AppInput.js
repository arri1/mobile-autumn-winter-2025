import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function AppInput(props) {
	return (
		<TextInput
			{...props}
			placeholderTextColor={theme.colors.muted}
			style={styles.input}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: theme.colors.card,
		padding: theme.spacing.md,
		borderRadius: theme.radius.md,
		fontSize: 16,
		color: theme.colors.text,
		marginBottom: theme.spacing.sm,
	},
});
