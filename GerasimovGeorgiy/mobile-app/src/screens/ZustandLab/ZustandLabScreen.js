import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import useAuthStore from '../../store/authStore';

const Container = styled.View`
  flex: 1;
  background-color: #0D0F14;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #E6E9EF;
  margin-bottom: 20px;
  text-align: center;
`;

const Card = styled.View`
  background-color: #1C2230;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #E6E9EF;
  margin-bottom: 12px;
`;

const Button = styled.TouchableOpacity`
  background-color: #5EEAD4;
  padding: 12px 24px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ButtonText = styled.Text`
  color: #0D0F14;
  font-weight: bold;
  text-align: center;
`;

const InfoText = styled.Text`
  color: #9AA4B2;
  font-size: 14px;
  margin-bottom: 8px;
`;

const ZustandLabScreen = () => {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({
        email: 'admin@example.com',
        password: 'admin123'
      });
      Alert.alert('Успех', 'Вы успешно вошли в систему!');
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Информация', 'Вы вышли из системы');
  };

  return (
    <Container>
      <Title>Zustand Lab</Title>
      
      <Card>
        <CardTitle>Состояние аутентификации</CardTitle>
        <InfoText>Аутентифицирован: {isAuthenticated ? 'Да' : 'Нет'}</InfoText>
        {user && (
          <>
            <InfoText>Пользователь: {user.name || 'N/A'}</InfoText>
            <InfoText>Email: {user.email}</InfoText>
            <InfoText>Роль: {user.role}</InfoText>
          </>
        )}
        {isLoading && <InfoText>Загрузка...</InfoText>}
        {error && <InfoText style={{ color: '#EF4444' }}>Ошибка: {error}</InfoText>}
      </Card>

      <Card>
        <CardTitle>Действия</CardTitle>
        {!isAuthenticated ? (
          <Button onPress={handleLogin}>
            <ButtonText>Войти как админ</ButtonText>
          </Button>
        ) : (
          <Button onPress={handleLogout}>
            <ButtonText>Выйти</ButtonText>
          </Button>
        )}
      </Card>

      <Card>
        <CardTitle>Информация</CardTitle>
        <InfoText>Этот экран демонстрирует работу с Zustand store для управления состоянием аутентификации.</InfoText>
        <InfoText>Вы можете войти в систему и просматривать информацию о пользователе.</InfoText>
      </Card>
    </Container>
  );
};

export default ZustandLabScreen;
