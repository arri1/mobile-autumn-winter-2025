import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
	const { login } = useAuth();

	return (
		<View style={styles.container}>
			<Text>Login Screen (пока пустышка)</Text>
			<Button title="Register" onPress={() => login('user', 'pass')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex:1, justifyContent:'center', alignItems:'center' }
});
