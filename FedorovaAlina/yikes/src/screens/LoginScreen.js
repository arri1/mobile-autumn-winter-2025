import React, { useState } from 'react';
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
import { useAppStore } from '../store/AppStore';
import { LoginStyles } from '../styles/LoginStyles';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading, error, setError } = useAppStore();

  // Демо учетные данные
  const demoCredentials = [
    { label: 'Admin', username: 'admin', password: 'admin123' },
    { label: 'User', username: 'user', password: 'user123' },
    { label: 'Guest', username: 'guest', password: 'guest123' }
  ];

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // Используем Zustand для логина
    const result = await login(username, password);

    if (!result.success) {
      setError('Invalid credentials. Use demo credentials below.');
    }
  };

  const copyToClipboard = async (text) => {
    Alert.alert('Copied!', 'Text copied to clipboard');
  };

  const fillDemoCredentials = (cred) => {
    setUsername(cred.username);
    setPassword(cred.password);
    setError('');
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
                Enter credentials to access React Native Hooks dashboard
              </Text>

              {/* Поле ввода логина */}
              <View style={LoginStyles.inputContainer}>
                <Text style={LoginStyles.inputLabel}>USERNAME</Text>
                <View style={LoginStyles.inputWrapper}>
                  <View style={LoginStyles.inputIcon}>
                    <Ionicons name="person" size={20} color="rgba(255, 255, 255, 0.6)" />
                  </View>
                  <TextInput
                    style={LoginStyles.textInput}
                    placeholder="Enter username"
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

              {/* Кнопка входа */}
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
                    ACCESS SYSTEM
                  </Text>
                )}
              </TouchableOpacity>

              {/* Сообщение об ошибке */}
              {error ? (
                <View style={LoginStyles.errorContainer}>
                  <Text style={LoginStyles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Демо учетные данные */}
              <View style={LoginStyles.demoCredentials}>
                <Text style={LoginStyles.demoTitle}>DEMO CREDENTIALS</Text>
                {demoCredentials.map((cred, index) => (
                  <TouchableOpacity
                    key={index}
                    style={LoginStyles.demoItem}
                    onPress={() => fillDemoCredentials(cred)}
                    activeOpacity={0.7}
                  >
                    <Text style={LoginStyles.demoLabel}>{cred.label}:</Text>
                    <Text style={LoginStyles.demoValue}>username: {cred.username}</Text>
                    <TouchableOpacity
                      style={LoginStyles.demoCopyButton}
                      onPress={() => copyToClipboard(cred.username)}
                    >
                      <Ionicons name="copy" size={14} color="rgba(255, 255, 255, 0.4)" />
                    </TouchableOpacity>
                    <Text style={LoginStyles.demoValue}>password: {cred.password}</Text>
                    <TouchableOpacity
                      style={LoginStyles.demoCopyButton}
                      onPress={() => copyToClipboard(cred.password)}
                    >
                      <Ionicons name="copy" size={14} color="rgba(255, 255, 255, 0.4)" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Нижняя кибер-линия */}
            <View style={LoginStyles.cyberLineBottom} />

            {/* Терминальный вывод */}
            <View style={LoginStyles.terminalOutput}>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>$</Text>
                <Text style={LoginStyles.terminalText}>System login interface initialized</Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>{'>'}</Text>
                <Text style={LoginStyles.terminalText}>Awaiting user authentication...</Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>{'>'}</Text>
                <Text style={LoginStyles.terminalText}>User: {username || 'not provided'}</Text>
              </View>
              <View style={LoginStyles.terminalLine}>
                <Text style={LoginStyles.terminalPrompt}>#</Text>
                <Text style={LoginStyles.terminalText}>Access level: {username === 'admin' ? 'admin' : 'standard'}</Text>
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