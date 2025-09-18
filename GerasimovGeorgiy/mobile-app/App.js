import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <SafeArea>
      <Container>
        <Title>Главная</Title>
        <Subtitle>React Navigation Bottom Tabs</Subtitle>
        <StatusBar style="auto" />
      </Container>
    </SafeArea>
  );
}

function SettingsScreen() {
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0B0C10' },
          headerTintColor: '#FFFFFF',
          tabBarStyle: { backgroundColor: '#0B0C10' },
          tabBarActiveTintColor: '#45A29E',
          tabBarInactiveTintColor: '#C5C6C7',
        }}
      >
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Настройки" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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

const Subtitle = styled(Text)`
  font-size: 16px;
  color: #c5c6c7;
  margin-bottom: 24px;
`;

const Helper = styled(Text)`
  color: #c5c6c7;
`;
