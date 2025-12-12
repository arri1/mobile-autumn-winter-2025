import React, { useState } from 'react';
import {View,  Text,  TextInput,  TouchableOpacity, ActivityIndicator,  SafeAreaView,  KeyboardAvoidingView,  Platform,} from 'react-native';
import { useAuthStore } from '../store/authStore';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { register, isLoading, error, clearError } = useAuthStore();

  const handleRegister = async () => {
    clearError();
    
    if (password !== confirmPassword) {
      useAuthStore.setState({ error: 'Пароли не совпадают' });
      return;
    } 
    
    const result = await register(name, email, password);
    if (result.success) {
      // Навигация произойдет автоматически
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Заголовок */}
          <View style={styles.header}>
            <Text style={styles.title}>Регистрация</Text>
            <Text style={styles.subtitle}>
              Создайте новый аккаунт
            </Text>
          </View>

          {/* Форма */}
          <View style={styles.form}>
            {/* Имя */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Имя</Text>
              <TextInput
                style={styles.input}
                placeholder="Введите ваше имя"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Введите email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Пароль */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Пароль</Text>
              <TextInput
                style={styles.input}
                placeholder="Введите пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <Text style={styles.hint}>
                Минимум 6 символов
              </Text>
            </View>

            {/* Подтверждение пароля */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Подтвердите пароль</Text>
              <TextInput
                style={styles.input}
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            {/* Ошибка */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Кнопка регистрации */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
              )}
            </TouchableOpacity>

            {/* Ссылка на вход */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Уже есть аккаунт? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dfe6e9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  hint: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 5,
    fontStyle: 'italic',
  },
  errorContainer: {
    backgroundColor: '#ffeaea',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#34C759',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#636e72',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
};

export default RegisterScreen;