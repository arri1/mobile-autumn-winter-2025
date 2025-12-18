import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { theme } from '../../theme/theme';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
	const navigation = useNavigation();
	const { register } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Регистрация</Text>

			<AppInput placeholder="Email" value={email} onChangeText={setEmail} />
			<AppInput
				placeholder="Пароль"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<AppButton title="Зарегистрироваться" onPress={() => register(email, password)} />
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<Text style={styles.link}>Уже есть аккаунт? Войти</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
		padding: theme.spacing.lg,
		justifyContent: 'center',
	},
	title: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: theme.spacing.lg,
		color: theme.colors.text,
	},
	link: {
		marginTop: theme.spacing.md,
		textAlign: 'center',
		color: theme.colors.primary,
	},
});