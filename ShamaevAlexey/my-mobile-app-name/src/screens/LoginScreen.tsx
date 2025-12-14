import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const doLogin = useAuthStore(state => state.login);

  const handleLogin = async () => {
    if (!login.trim() || !pass.trim()) {
      Alert.alert('Ошибка', 'Введите логин и пароль');
      return;
    }

    const ok = await doLogin(login, pass);
    if (!ok) Alert.alert('Ошибка', 'Неверные данные');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <Button title="Войти" onPress={handleLogin} />
      <View style={{ height: 12 }} />
      <Button
        title="Регистрация"
        onPress={() => navigation.navigate('Register')}
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 4 },
});