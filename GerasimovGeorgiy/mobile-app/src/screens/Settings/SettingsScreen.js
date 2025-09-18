import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function SettingsScreen() {
  return (
    <SafeArea>
      <Container>
        <Title>Настройки</Title>
        <Helper>Здесь будут настройки приложения</Helper>
        <StatusBar style="auto" />
      </Container>
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #0b0c10;
`;

const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const Helper = styled(Text)`
  color: #c5c6c7;
`;
