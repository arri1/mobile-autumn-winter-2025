import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { fetchTasksFromAPI } from '../screens/UseEffect_todo';
import { TodoAdvancedScreen } from '../screens/UseMemo_Analiz';
import { RegisterScreen } from '../screens/RegisterScreen';
import { LoginScreen1 } from '../screens/LoginScreen';
import { LoginScreen } from '../screens/UseState_Login';

export type RootStackParamList = {
  Home: undefined;
  Api: undefined;
  Advanced: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#253e59ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Назад',
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'React Native Лабораторные',
            headerStyle: {
              backgroundColor: '#007AFF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        {/* <Stack.Screen 
          name="Api" 
          component={fetchTasksFromAPI}
          options={{ 
            title: 'UseEffect - Лаб. 2',
            headerBackTitle: 'Назад',
          }}
        /> */}
        <Stack.Screen 
          name="Advanced" 
          component={TodoAdvancedScreen}
          options={{ title: 'UseMemo - Лаб. 3' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen1}
          options={{ title: 'Вход в систему' }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{ title: 'Регистрация' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};