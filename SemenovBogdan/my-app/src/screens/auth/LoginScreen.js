import React, { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../theme/useTheme';

export default function LoginScreen({ navigation }) {
	const { signIn } = useAuth();
	const { colors } = useTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		setLoading(true);
		const res = await signIn(email.trim(), password);
		setLoading(false);
		if (!res.ok) Alert.alert('Ошибка', res.error);
	};

	return (
	<KeyboardAvoidingView
		behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		style={[styles.container, { backgroundColor: colors.background }]}
	>
		<View style={[styles.card, { backgroundColor: colors.card }]}> 
			<Text style={[styles.title, { color: colors.text }]}>Войти</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Пароль"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TouchableOpacity
				style={[styles.btn, { backgroundColor: colors.primary }]}
				onPress={onSubmit}
				disabled={loading}
			>
				<Text style={styles.btnText}>{loading ? 'Вход...' : 'Войти'}</Text>
			</TouchableOpacity>

			<View style={styles.row}>
				<Text>Нет аккаунта?</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Register')}>
					<Text style={{ marginLeft: 8, color: colors.primary }}>Регистрация</Text>
				</TouchableOpacity>
			</View>
		</View>
	</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', padding: 20 },
	card: { padding: 20, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.05, elevation: 3 },
	title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
	input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 12, borderRadius: 10, marginBottom: 12 },
	btn: { padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
	btnText: { color: '#fff', fontWeight: '700' },
	row: { flexDirection: 'row', marginTop: 16, justifyContent: 'center' },
});