import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { TodoScreen } from '../screens/UseEffect_todo';
import { TodoAdvancedScreen } from '../screens/UseMemo_Analiz';
import { LoginScreen } from '../screens/UseState_Login';

export type RootStackParamList = {
  Home: undefined;
  Todo: undefined;
  Advanced: undefined;
  Login: undefined;
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
        <Stack.Screen 
          name="Todo" 
          component={TodoScreen}
          options={{ 
            title: 'UseState - Лаб. 1',
            headerBackTitle: 'Назад',
          }}
        />
        <Stack.Screen 
          name="Advanced" 
          component={TodoAdvancedScreen}
          options={{ title: 'UseEffect - Лаб. 2' }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ title: 'UseMemo - Лаб. 3' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};