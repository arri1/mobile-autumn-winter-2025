import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../store/authStore';
import { LoginStyles } from '../styles/LoginStyles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const { 
    login, 
    register, 
    isLoading, 
    error, 
    clearError,
  } = useAuthStore();

  // Очищаем ошибку при смене режима
  useEffect(() => {
    clearError();
  }, [isLoginMode]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      if (isLoginMode) {
        // ТОЛЬКО реальный логин через API
        const result = await login(username, password);
        
        if (result.success) {
          // Успешный вход
          setUsername('');
          setPassword('');
          clearError();
        } else {
          // Показываем ошибку от API
          Alert.alert(
            'Login Failed',
            result.error || 'Invalid email/username or password'
          );
        }
      } else {
        // Регистрация через API
        const email = username.includes('@') ? username : `${username}@cybersystem.com`;
        const result = await register(username, password, email);
        
        if (result.success) {
          Alert.alert('Success', 'Account created successfully!');
          setUsername('');
          setPassword('');
          clearError();
        } else {
          Alert.alert('Registration Failed', result.error || 'Registration failed');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    }
  };

  // Функция проверки статуса API
  const checkApiStatus = async () => {
    try {
      setLoadingStatus(true);
      const response = await fetch('https://cloud.kit-imi.info/api/health', {
        timeout: 5000
      });
      
      if (response.ok) {
        Alert.alert('API Status', '✅ API is working properly');
      } else {
        Alert.alert('API Status', '⚠️ API returned an error');
      }
    } catch (error) {
      Alert.alert('API Status', '❌ Cannot connect to API. Please check the server.');
    } finally {
      setLoadingStatus(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#0a0a0a', '#121212', '#1a1a1a']}
        style={LoginStyles.gradientBackground}
      >
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={LoginStyles.safeArea}>
          <ScrollView
            contentContainerStyle={LoginStyles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Верхняя кибер-линия */}
            <View style={LoginStyles.cyberLineTop} />

            {/* Логотип */}
            <View style={LoginStyles.logoContainer}>
              <Text style={LoginStyles.logoTitle}>HOOKS v2.0.5</Text>
              <Text style={LoginStyles.logoSubtitle}>CYBER ACCESS SYSTEM</Text>
            </View>

            {/* Карточка авторизации */}
            <View style={LoginStyles.loginCard}>
              <Text style={LoginStyles.loginTitle}>SYSTEM ACCESS</Text>
              <Text style={LoginStyles.loginSubtitle}>
                {isLoginMode 
                  ? 'Enter credentials to access React Native Hooks dashboard'
                  : 'Create new account to get started'
                }
              </Text>

              {/* Переключение между логином и регистрацией */}
              <View style={LoginStyles.modeSwitchContainer}>
                <TouchableOpacity
                  style={[
                    LoginStyles.modeButton,
                    isLoginMode && LoginStyles.modeButtonActive
                  ]}
                  onPress={() => setIsLoginMode(true)}
                  disabled={isLoading}
                >
                  <Text style={[
                    LoginStyles.modeButtonText,
                    isLoginMode && LoginStyles.modeButtonTextActive
                  ]}>
                    LOGIN
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    LoginStyles.modeButton,
                    !isLoginMode && LoginStyles.modeButtonActive
                  ]}
                  onPress={() => setIsLoginMode(false)}
                  disabled={isLoading}
                >
                  <Text style={[
                    LoginStyles.modeButtonText,
                    !isLoginMode && LoginStyles.modeButtonTextActive
                  ]}>
                    REGISTER
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Поле ввода логина */}
              <View style={LoginStyles.inputContainer}>
                <Text style={LoginStyles.inputLabel}>
                  {isLoginMode ? 'USERNAME OR EMAIL' : 'USERNAME'}
                </Text>
                <View style={LoginStyles.inputWrapper}>
                  <View style={LoginStyles.inputIcon}>
                    <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.6)" />
                  </View>
                  <TextInput
                    style={LoginStyles.textInput}
                    placeholder={isLoginMode ? "Enter username or email" : "Enter username"}
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isLoading}
                  />
                </View>
              </View>

              {/* Поле ввода пароля */}
              <View style={LoginStyles.inputContainer}>
                <Text style={LoginStyles.inputLabel}>PASSWORD</Text>
                <View style={LoginStyles.inputWrapper}>
                  <View style={LoginStyles.inputIcon}>
                    <Ionicons name="lock-closed" size={20} color="rgba(255, 255, 255, 0.6)" />
                  </View>
                  <TextInput
                    style={LoginStyles.textInput}
                    placeholder="Enter password"
                    placeholderTextColor="rgba(255, 255, 255, 0.3)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                  <TouchableOpacity
                    style={LoginStyles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Сообщение об ошибке */}
              {error ? (
                <View style={LoginStyles.errorContainer}>
                  <Ionicons name="warning" size={20} color="#ff2a6d" />
                  <Text style={LoginStyles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Кнопка входа/регистрации */}
              <TouchableOpacity
                style={[
                  LoginStyles.loginButton,
                  (!username.trim() || !password.trim() || isLoading) && LoginStyles.loginButtonDisabled
                ]}
                onPress={handleLogin}
                disabled={!username.trim() || !password.trim() || isLoading}
                activeOpacity={0.8}
              >
                {isLoading ? (
                  <ActivityIndicator color="#00d4ff" />
                ) : (
                  <Text style={[
                    LoginStyles.loginButtonText,
                    (!username.trim() || !password.trim()) && LoginStyles.loginButtonTextDisabled
                  ]}>
                    {isLoginMode ? 'ACCESS SYSTEM' : 'CREATE ACCOUNT'}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Кнопка проверки API */}
              <TouchableOpacity
                style={LoginStyles.apiStatusButton}
                onPress={checkApiStatus}
                activeOpacity={0.7}
                disabled={isLoading}
              >
                <Ionicons name="wifi" size={16} color="#00d4ff" />
                <Text style={LoginStyles.apiStatusButtonText}>CHECK API STATUS</Text>
              </TouchableOpacity>
            </View>

            {/* Нижняя кибер-линия */}
            <View style={LoginStyles.cyberLineBottom} />

            {/* Терминальный вывод */}
            <View style={LoginStyles.terminalOutput}>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>$</Text>
                <Text style={LoginStyles.terminalText}>
                  {isLoginMode ? 'System login interface initialized' : 'Registration interface active'}
                </Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>{'>'}</Text>
                <Text style={LoginStyles.terminalText}>
                  {isLoginMode ? 'Awaiting user authentication...' : 'Ready to create new account...'}
                </Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>{'>'}</Text>
                <Text style={LoginStyles.terminalText}>User: {username || 'not provided'}</Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>#</Text>
                <Text style={LoginStyles.terminalText}>
                  {isLoginMode 
                    ? 'Authenticating via API server...'
                    : 'Creating account via API server...'
                  }
                </Text>
              </View>
            </View>

            {/* Статус системы */}
            <View style={LoginStyles.statusContainer}>
              <View style={LoginStyles.statusDot} />
              <Text style={LoginStyles.statusText}>SYSTEM STATUS: ONLINE</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}