import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
	const { register } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const onSubmit = async () => {
		try {
		  	await register({ email, password, name });
		} catch (e) {
		  	Alert.alert('Ошибка', e.message);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				placeholder="Email"
				autoCapitalize="none"
				value={email}
				onChangeText={setEmail}
				style={styles.input}
			/>
			<TextInput
				placeholder="Пароль (мин. 6 символов)"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>
			<Button title="Зарегистрироваться" onPress={onSubmit} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', padding: 20 },
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 12,
		marginBottom: 12,
		borderRadius: 6,
	},
});
