import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';
import useAuthStore from '../../auth/auth';

const Container = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const Header = styled.View`
  align-items: center;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  color: #9aa4b2;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.View`
  margin-bottom: 30px;
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  color: #e6e9ef;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.TextInput`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  color: #ffffff;
  border: 1px solid #3a3a3a;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: #00ff00ff;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-bottom: 16px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const RegisterButtonText = styled.Text`
  color: #000000ff;
  font-size: 18px;
  font-weight: bold;
`;

const DemoButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid #00ff00ff;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-bottom: 20px;
`;

const DemoButtonText = styled.Text`
  color: #00ff00ff;
  font-size: 16px;
  font-weight: 500;
`;

const ErrorText = styled.Text`
  color: #ff0000ff;
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
`;

const LinkText = styled.Text`
  color: #00ff00ff;
  font-size: 16px;
  font-weight: 500;
  text-decoration-line: underline;
`;

const Footer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const FooterText = styled.Text`
  color: #9aa4b2;
  font-size: 16px;
  margin-right: 8px;
`;

export default function RegisterScreen({ navigation }) {
  // Получаем методы из хранилища
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  
  // Получаем состояние загрузки и ошибки из хранилища
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Валидация полей
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
    
    if (name.length < 2) {
      Alert.alert('Ошибка', 'Имя должно содержать минимум 2 символа');
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
      // Регистрируем пользователя с именем
      await register({  email, password,name });
      
      // Автоматически входим после успешной регистрации
      await login({ email, password });
      
      //Alert.alert('Успех', 'Регистрация прошла успешно!');
      // Можно добавить навигацию на главный экран
      // navigation.navigate('Main');
    } catch (error) {
      // Ошибка обрабатывается в хранилище и отображается через состояние error
      console.error('Registration error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Header>
            <Title>Регистрация</Title>
            <Subtitle>Создайте новый аккаунт</Subtitle>
          </Header>

          <Form>
            {error ? <ErrorText>{error}</ErrorText> : null}

            <InputContainer>
              <Label>Имя</Label>
              <Input
                placeholder="Введите ваше имя"
                placeholderTextColor="#6b7280"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </InputContainer>

            <InputContainer>
              <Label>Email</Label>
              <Input
                placeholder="Введите email"
                placeholderTextColor="#6b7280"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputContainer>

            <InputContainer>
              <Label>Пароль</Label>
              <Input
                placeholder="Введите пароль"
                placeholderTextColor="#6b7280"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </InputContainer>

            <InputContainer>
              <Label>Подтвердите пароль</Label>
              <Input
                placeholder="Повторите пароль"
                placeholderTextColor="#6b7280"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </InputContainer>

            <RegisterButton 
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000000ff" />
              ) : (
                <RegisterButtonText>Создать аккаунт</RegisterButtonText>
              )}
            </RegisterButton>
          </Form>

          <Footer>
            <FooterText>
              Уже есть аккаунт?
            </FooterText>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LinkText>Войти</LinkText>
            </TouchableOpacity>
          </Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}