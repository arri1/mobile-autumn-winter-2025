import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginStyles } from './LoginScreenStyle';
import { useAuthStore } from '../../backend/auth'; 
import { RootStackParamList } from '../../navigation/types'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) { 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    try {
      await login({ email, password });
    } catch (error: any) {
      Alert.alert('Ошибка', error.message || 'Неверный email или пароль');
    }
  };

  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <SafeAreaView style={LoginStyles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={LoginStyles.scrollContent}>
          <View style={LoginStyles.header}>
            <Text style={LoginStyles.welcomeTitle}>Добро пожаловать!</Text>
            <Text style={LoginStyles.subtitle}>Войдите в свой аккаунт</Text>
          </View>

          <View style={LoginStyles.form}>
            <View style={LoginStyles.inputContainer}>
              <Text style={LoginStyles.label}>Email</Text>
              <TextInput
                style={LoginStyles.input}
                placeholder="Введите ваш email"
                placeholderTextColor="#C5C6C7"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address" 
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
                onPress={() => fillDemoCredentials('test@example.com', 'password123')} 
                disabled={isLoading}
              >
                <Text style={LoginStyles.demoAccountText}>Тестовый пользователь</Text>
                <Text style={LoginStyles.demoAccountDetails}>test@example.com / password123</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}