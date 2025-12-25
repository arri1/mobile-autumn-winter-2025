import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Alert, 
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://cloud.kit-imi.info/api';

export default function AuthSimpleWithRedirect({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Введите email и пароль');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email.trim(), 
          password 
        }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.data.accessToken);
        Alert.alert(
          'Авторизация успешна!',
          `Добро пожаловать, ${data.data.user.name}!`,
          [{ 
            text: 'OK', 
            onPress: () => onSuccess()
          }]
        );
      } else {
        Alert.alert('Ошибка', data.message || 'Неверные данные');
      }
    } catch {
      Alert.alert('Ошибка', 'Не удалось подключиться');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.btnWrapper}>
        <Button
          title="Авторизоваться"
          onPress={handleLogin}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  inputWrapper: {
    marginBottom: 12
  },
  btnWrapper: {
    marginBottom: 12
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10
  }
});