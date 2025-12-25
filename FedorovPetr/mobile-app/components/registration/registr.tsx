// RegisterScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  Alert, 
  StyleSheet,
  ActivityIndicator 
} from 'react-native';

const API_URL = 'https://cloud.kit-imi.info/api';

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }
    if (formData.password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен быть минимум 6 символов');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
          name: formData.name.trim()
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Успех', 'Регистрация прошла успешно!', [
          { text: 'OK', onPress: () => {
            setFormData({
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
            });
          }}
        ]);
      } else {
        if (data.errors && data.errors.length > 0) {
          const errorMsg = data.errors
            .map((err: any) => `${err.field}: ${err.message}`)
            .join('\n');
          Alert.alert('Ошибка', errorMsg);
        } else {
          Alert.alert('Ошибка', data.message || 'Ошибка регистрации');
        }
      }
    } catch (error: any) {
      Alert.alert('Ошибка', 'Не удалось подключиться к серверу');
      console.error('Register error:', error);
    } finally {
      setLoading(false);
    }
  };
  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Имя"
          value={formData.name}
          onChangeText={(value) => updateField('name', value)}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => updateField('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Пароль (минимум 6 символов)"
          value={formData.password}
          onChangeText={(value) => updateField('password', value)}
          secureTextEntry
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Повторите пароль"
          value={formData.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
          secureTextEntry
        />
      </View>
      <View style={styles.btnWrapper}>
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : (
          <Button
            title="Зарегистрироваться"
            onPress={handleRegister}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  inputWrapper: {
    marginBottom: 12
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  btnWrapper: {
    marginTop: 8,
    marginBottom: 12
  }
});