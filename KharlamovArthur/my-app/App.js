import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('Приложение запущено');
    return () => {
      console.log('Приложение закрыто');
    };
  }, []);
  useEffect(() => {
  });

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Мое приложение' }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}