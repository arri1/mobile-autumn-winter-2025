import React from 'react';
import { Switch, Alert } from 'react-native';
import useAuthStore from '../../store/authStore';
import { useStore } from '../../store/useStore';
import {
  SafeArea,
  Container,
  Header,
  Title,
  Subtitle,
  UserInfo,
  UserName,
  UserEmail,
  SectionTitle,
  Card,
  CardHeader,
  CardTitle,
  Divider,
  SettingRow,
  SettingInfo,
  SettingLabel,
  SettingDescription,
  LogoutButton,
  LogoutButtonText,
} from './Settings.styles';
export default function SettingsScreen() {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const { theme, enabled, toggleTheme, setEnabled } = useStore();

  const handleLogout = () => {
    Alert.alert('Выход', 'Вы уверены, что хотите выйти?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Выйти', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <SafeArea>
      <Container>
        <Header>
          <Title>Настройки</Title>
          <Subtitle>Управление приложением</Subtitle>
        </Header>

        <UserInfo>
          <UserName>{user?.name || 'Пользователь'}</UserName>
          <UserEmail>{user?.email || 'user@example.com'}</UserEmail>
        </UserInfo>

        <SectionTitle>Внешний вид</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Тема</CardTitle>
          </CardHeader>
          <Divider />
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Темная тема</SettingLabel>
              <SettingDescription>
                {theme === 'dark' ? 'Темная тема' : 'Светлая тема'}
              </SettingDescription>
            </SettingInfo>
            <Switch
              value={theme === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: '#3a3a3a', true: '#5eead4' }}
              thumbColor={theme === 'dark' ? '#ffffff' : '#9aa4b2'}
            />
          </SettingRow>
        </Card>

        <SectionTitle>Дополнительно</SectionTitle>
        <Card>
          <CardHeader>
            <CardTitle>Режим разработчика</CardTitle>
          </CardHeader>
          <Divider />
          <SettingRow>
            <SettingInfo>
              <SettingLabel>Включить режим разработчика</SettingLabel>
              <SettingDescription>Дополнительные функции для разработки</SettingDescription>
            </SettingInfo>
            <Switch
              value={enabled}
              onValueChange={setEnabled}
              trackColor={{ false: '#3a3a3a', true: '#5eead4' }}
              thumbColor={enabled ? '#ffffff' : '#9aa4b2'}
            />
          </SettingRow>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Безопасность</CardTitle>
          </CardHeader>
          <Divider />
          <LogoutButton onPress={handleLogout}>
            <LogoutButtonText>🚪 Выйти из аккаунта</LogoutButtonText>
          </LogoutButton>
        </Card>
      </Container>
    </SafeArea>
  );
}
