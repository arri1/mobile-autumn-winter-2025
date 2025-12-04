import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { LoginStyles } from './LoginScreenStyle';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginLab({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    if (username.length < 3) {
      Alert.alert('Ошибка', 'Логин должен содержать минимум 3 символа');
      return;
    }

    const success = await login(username, password);
    if (!success) {
      Alert.alert('Ошибка', 'Неверный логин или пароль');
    }
  };

  const fillDemoCredentials = (demoUsername: string, demoPassword: string) => {
    setUsername(demoUsername);
    setPassword(demoPassword);
  };

  return (
    <SafeAreaView style={LoginStyles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={LoginStyles.scrollContent}>
          <View style={LoginStyles.header}>
            <Text style={LoginStyles.welcomeTitle}>Добро пожаловать! Сай</Text>
            <Text style={LoginStyles.subtitle}>Войдите в свой аккаунт</Text>
          </View>

          <View style={LoginStyles.form}>
            <View style={LoginStyles.inputContainer}>
              <Text style={LoginStyles.label}>Логин</Text>
              <TextInput
                style={LoginStyles.input}
                placeholder="Введите ваш логин"
                placeholderTextColor="#C5C6C7"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={LoginStyles.inputContainer}>
              <Text style={LoginStyles.label}>Пароль</Text>
              <View style={LoginStyles.passwordContainer}>
                <TextInput
                  style={LoginStyles.passwordInput}
                  placeholder="Введите ваш пароль"
                  placeholderTextColor="#C5C6C7"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity style={LoginStyles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={LoginStyles.showPasswordText}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[LoginStyles.primaryButton, isLoading && LoginStyles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="#0B0C10" /> : <Text style={LoginStyles.primaryButtonText}>Войти</Text>}
            </TouchableOpacity>

            <View style={LoginStyles.registerContainer}>
              <Text style={LoginStyles.registerText}>Еще нет аккаунта?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
                <Text style={LoginStyles.registerLink}> Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>

            <View style={LoginStyles.demoContainer}>
              <Text style={LoginStyles.demoTitle}>Демо доступы:</Text>
              <TouchableOpacity
                style={LoginStyles.demoAccount}
                onPress={() => fillDemoCredentials('user', 'password123')}
                disabled={isLoading}
              >
                <Text style={LoginStyles.demoAccountText}>Гость</Text>
                <Text style={LoginStyles.demoAccountDetails}>user / password123</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}