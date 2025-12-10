import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from './src/store/authStore';
import AuthScreen from './src/screens/AuthScreen';
import OriginalApp from './App';

export default function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!appReady || isLoading) {
    return (
      <LinearGradient
        colors={['#0D1B2A', '#1B263B', '#2C3E50']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFD700" />
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              🎄 Новогоднее приложение
            </Text>
            <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14 }}>
              Загрузка праздничного настроения...
            </Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen 
        goBack={() => {}} 
        onSuccess={() => console.log('Авторизация успешна!')}
      />
    );
  }

  return <OriginalApp />;
}