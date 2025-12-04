import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/useTheme';

export default function SplashScreen() {
	const { colors } = useTheme();
	return (
	<View style={[styles.container, { backgroundColor: colors.background }]}> 
		<ActivityIndicator size="large" />
		<Text style={{ marginTop: 12 }}>Загрузка...</Text>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});