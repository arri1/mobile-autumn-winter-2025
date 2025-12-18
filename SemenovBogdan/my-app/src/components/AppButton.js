import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function AppButton({
	title,
	onPress,
	variant = 'primary',
}) {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: theme.colors[variant] },
			]}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: theme.spacing.md,
		borderRadius: theme.radius.lg,
		alignItems: 'center',
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
});
