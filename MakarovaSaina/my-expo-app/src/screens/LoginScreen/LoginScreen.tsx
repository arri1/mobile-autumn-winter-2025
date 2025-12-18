import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { LoginStyles } from './LoginScreenStyle';
import { useAuth } from '../../contexts/AuthContext'; 

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginLab({ navigation }: Props) {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error: authError, clearError } = useAuth(); // Используем контекст

  React.useEffect(() => {
    if (authError) {
      Alert.alert('Ошибка', authError);
      clearError();
    }
  }, [authError, clearError]);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите email');
      return;
    }
    
    if (!emailRegex.test(email)) {
      Alert.alert('Ошибка', 'Пожалуйста, введите корректный email (например: user@example.com)');
      return;
    }
    
    if (!password.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите пароль');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Ошибка', 'Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        console.log('Login successful');        
      } else {
        Alert.alert('Ошибка', 'Не удалось войти в систему');
      }
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('user@example.com');
    setPassword('password123');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={LoginStyles.safeArea} edges={['top', 'left', 'right']}>
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
                  <TouchableOpacity 
                    style={LoginStyles.showPasswordButton} 
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <Text style={LoginStyles.showPasswordText}>
                      {showPassword ? '🙈' : '👁️'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[LoginStyles.primaryButton, isLoading && LoginStyles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#0B0C10" />
                ) : (
                  <Text style={LoginStyles.primaryButtonText}>Войти</Text>
                )}
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
                  onPress={fillDemoCredentials}
                  disabled={isLoading}
                >
                  <Text style={LoginStyles.demoAccountText}>Демо аккаунт</Text>
                  <Text style={LoginStyles.demoAccountDetails}>user@example.com / password123</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}