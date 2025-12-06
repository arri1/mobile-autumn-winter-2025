import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UseStateScreen from './src/screens/UseStateScreen';
import UseEffectScreen from './src/screens/UseEffectScreen';
import UseMemoScreen from './src/screens/UseMemoScreen';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home', 'usestate', 'useeffect', 'usememo'

  const renderScreen = () => {
    switch (screen) {
      case 'usestate':
        return <UseStateScreen goBack={() => setScreen('home')} />;
      case 'useeffect':
        return <UseEffectScreen goBack={() => setScreen('home')} />;
      case 'usememo':
        return <UseMemoScreen goBack={() => setScreen('home')} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Главная страница</Text>
      <Text style={styles.subtitle}>Демонстрация React Hooks</Text>
      
      <TouchableOpacity
        style={[styles.navButton, styles.useStateButton]}
        onPress={() => setScreen('usestate')}
      >
        <Text style={styles.navButtonText}>📱 useState</Text>
        <Text style={styles.navButtonSubtitle}>Управление состоянием</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.useEffectButton]}
        onPress={() => setScreen('useeffect')}
      >
        <Text style={styles.navButtonText}>⚡ useEffect</Text>
        <Text style={styles.navButtonSubtitle}>Побочные эффекты</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.useMemoButton]}
        onPress={() => setScreen('usememo')}
      >
        <Text style={styles.navButtonText}>💾 useMemo</Text>
        <Text style={styles.navButtonSubtitle}>Оптимизация вычислений</Text>
      </TouchableOpacity>
    </View>
  );

  return renderScreen();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  navButton: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
  },
  useStateButton: {
    backgroundColor: '#3498db',
  },
  useEffectButton: {
    backgroundColor: '#9b59b6',
  },
  useMemoButton: {
    backgroundColor: '#27ae60',
  },
  navButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  navButtonSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});
//