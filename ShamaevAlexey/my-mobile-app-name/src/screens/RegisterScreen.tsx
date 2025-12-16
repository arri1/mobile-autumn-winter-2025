import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const doRegister = useAuthStore(state => state.register);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Main');
    }
  }, [isAuthenticated, navigation]);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !pass.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const ok = await doRegister(name, email, pass);
    if (ok) {
      Alert.alert('Успех', 'Регистрация прошла успешно');
    } else {
      Alert.alert('Ошибка', 'Email уже занят');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <Button title="Зарегистрироваться" onPress={handleRegister} />
      <View style={{ height: 12 }} />
      <Button
        title="Назад"
        onPress={() => navigation.navigate('Login')}
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