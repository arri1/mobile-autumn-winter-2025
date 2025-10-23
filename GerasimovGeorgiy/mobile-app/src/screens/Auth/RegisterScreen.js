import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import useAuthStore from '../../store/authStore';

const Container = styled.View`
  flex: 1;
  background-color: #1a1a1a;
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
  background-color: #5eead4;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
  margin-bottom: 16px;
`;

const RegisterButtonText = styled.Text`
  color: #1a1a1a;
  font-size: 16px;
  font-weight: 600;
`;

const DemoButton = styled.TouchableOpacity`
  background-color: transparent;
  border: 1px solid #5eead4;
  border-radius: 12px;
  padding: 16px;
  align-items: center;
`;

const DemoButtonText = styled.Text`
  color: #5eead4;
  font-size: 16px;
  font-weight: 500;
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

export default function RegisterScreen() {
  const navigation = useNavigation();
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
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
      // Сначала регистрируем пользователя
      await register({ name, email, password });
      
      // Затем автоматически входим
      await login({ email, password });
      
      Alert.alert('Успех', 'Регистрация прошла успешно!');
    } catch (error) {
      Alert.alert('Ошибка', error.message || 'Не удалось зарегистрироваться');
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
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Header>
            <Title>Регистрация</Title>
            <Subtitle>Создайте новый аккаунт</Subtitle>
          </Header>

          <Form>
            <InputContainer>
              <Label>Имя</Label>
              <Input
                placeholder="Введите имя"
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

            <RegisterButton onPress={handleRegister}>
              <RegisterButtonText>Зарегистрироваться</RegisterButtonText>
            </RegisterButton>

            <DemoButton onPress={handleDemoFill}>
              <DemoButtonText>Заполнить демо данные</DemoButtonText>
            </DemoButton>
          </Form>

          <Footer>
            <FooterText>
              Уже есть аккаунт?
            </FooterText>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: '#5eead4', fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>
                Войти
              </Text>
            </TouchableOpacity>
          </Footer>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
