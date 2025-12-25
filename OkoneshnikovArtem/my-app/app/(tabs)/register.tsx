import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/authStore';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите имя');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Введите пароль');
      return;
    }
    if (!confirmPassword.trim()) {
      Alert.alert('Ошибка', 'Подтвердите пароль');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Ошибка', 'Введите корректный email');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Ошибка', 'Пароли не совпадают');
      return;
    }

    try {
      await register({ name, email, password });
      Alert.alert('Успех', 'Регистрация прошла успешно!', [
        { text: 'OK', onPress: () => router.push('/(tabs)/profile') }
      ]);
    } catch (error) {
      Alert.alert('Ошибка', error instanceof Error ? error.message : 'Не удалось зарегистрироваться');
    }
  };

  const handleDemoFill = () => {
    setName('Демо Пользователь');
    setEmail('demo@example.com');
    setPassword('demo123');
    setConfirmPassword('demo123');
    Alert.alert('Демо', 'Данные заполнены! Нажмите "Зарегистрироваться"');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Регистрация</Text>
          <Text style={styles.subtitle}>Создайте новый аккаунт</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Новый пользователь</Text>

          <Text style={styles.label}>Имя</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите имя"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoCorrect={false}
            editable={!isLoading}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isLoading}
          />

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите пароль"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isLoading}
          />

          <Text style={styles.label}>Подтвердите пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Повторите пароль"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!isLoading}
          />

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#007AFF" />
              <Text style={styles.loadingText}>Регистрация...</Text>
            </View>
          )}

          <View style={styles.buttonGroup}>
            <Button
              title={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
              onPress={handleRegister}
              disabled={isLoading}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              title="Заполнить демо данные"
              onPress={handleDemoFill}
              color="#FF9500"
              disabled={isLoading}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Уже есть аккаунт?</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/login')} disabled={isLoading}>
            <Text style={styles.linkText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2d2d2d',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
    color: '#aaa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
  buttonGroup: {
    marginBottom: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007AFF',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 16,
    marginBottom: 8,
  },
  linkText: {
    color: '#0a84ff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
