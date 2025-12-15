import React, { useState } from 'react';
import {
	View,
	TextInput,
	Button,
	StyleSheet,
	Alert,
	TouchableOpacity,
	Text,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
	const navigation = useNavigation();
	const { login } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async () => {
		try {
			await login(email, password);
		} catch (e) {
			Alert.alert('Ошибка входа', e.message);
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
				placeholder="Пароль"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
				style={styles.input}
			/>
			<Button title="Войти" onPress={onSubmit} />
			<TouchableOpacity
				style={styles.registerBtn}
				onPress={() => navigation.navigate('Register')}
			>
				<Text style={styles.registerText}>
					Нет аккаунта? Зарегистрироваться
				</Text>
			</TouchableOpacity>
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
	registerBtn: {
		marginTop: 16,
		alignItems: 'center',
	},
	registerText: {
		color: '#3498db',
		fontSize: 14,
	},
});
