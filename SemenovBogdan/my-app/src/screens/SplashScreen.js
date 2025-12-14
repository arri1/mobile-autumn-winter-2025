import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function SplashScreen() {
	return (
	<View style={[styles.container]}> 
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