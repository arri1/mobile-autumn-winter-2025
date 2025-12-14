import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const doRegister = useAuthStore(state => state.register);

  const handleRegister = async () => {
    if (!name.trim() || !login.trim() || !pass.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    const ok = await doRegister(name, login, pass);
    if (ok) {
      Alert.alert('Успех', 'Регистрация прошла успешно');
      navigation.navigate('Login');
    } else {
      Alert.alert('Ошибка', 'Логин уже занят');
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
      <Button title="Зарегистрироваться" onPress={handleRegister} />
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