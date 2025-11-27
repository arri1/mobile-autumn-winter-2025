import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/AuthNavigator';
import { CommonStyles, AuthStyles } from './styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
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
    <SafeAreaView style={CommonStyles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={AuthStyles.scrollContent}>
          <View style={AuthStyles.header}>
            <Text style={AuthStyles.welcomeTitle}>Добро пожаловать, Мяу!</Text>
            <Text style={CommonStyles.subtitle}>Войдите в свой аккаунт</Text>
          </View>

          <View style={AuthStyles.form}>
            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Логин</Text>
              <TextInput
                style={CommonStyles.input}
                placeholder="Введите ваш логин"
                placeholderTextColor="#C5C6C7"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <View style={CommonStyles.inputContainer}>
              <Text style={CommonStyles.label}>Пароль</Text>
              <View style={CommonStyles.passwordContainer}>
                <TextInput
                  style={CommonStyles.passwordInput}
                  placeholder="Введите ваш пароль"
                  placeholderTextColor="#C5C6C7"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
                <TouchableOpacity style={AuthStyles.showPasswordButton} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={AuthStyles.showPasswordText}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[CommonStyles.primaryButton, isLoading && CommonStyles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? <ActivityIndicator color="#0B0C10" /> : <Text style={CommonStyles.primaryButtonText}>Войти</Text>}
            </TouchableOpacity>

            <View style={AuthStyles.registerContainer}>
              <Text style={AuthStyles.registerText}>Еще нет аккаунта?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
                <Text style={AuthStyles.registerLink}> Зарегистрироваться</Text>
              </TouchableOpacity>
            </View>

            <View style={AuthStyles.demoContainer}>
              <Text style={AuthStyles.demoTitle}>Демо доступы:</Text>
              <TouchableOpacity
                style={AuthStyles.demoAccount}
                onPress={() => fillDemoCredentials('user', 'password123')}
                disabled={isLoading}
              >
                <Text style={AuthStyles.demoAccountText}>Гость</Text>
                <Text style={AuthStyles.demoAccountDetails}>user / password123</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}