import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

export default function UseStateScreen() {

  const systemColorScheme = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [count, setCount] = useState(0);

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#4CAF50',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
      button: '#2196F3',
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: currentTheme.text,
      textAlign: 'center',
    },
    card: {
      backgroundColor: currentTheme.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    text: {
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    label: {
      fontSize: 18,
      color: currentTheme.text,
    },
    counterText: {
      fontSize: 20,
      textAlign: 'center',
      color: currentTheme.text,
      marginVertical: 15,
    },
    button: {
      backgroundColor: currentTheme.button,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: '#00ff00ff',
    },
    buttonText: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={currentTheme.background}
      />
      
      <Text style={styles.header}>Настройки отображения интерфейса</Text>
      
      <View style={styles.card}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>
            {isDarkMode ? 'Темная тема' : 'Светлая тема'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            thumbColor={isDarkMode ? '#00ff00ff' : '#f4f3f4'}
            trackColor={{ false: '#ff0000ff', true: '#00ff00ff' }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.counterText}>Счётчик: {count}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
          <Text style={styles.buttonText}>Увеличить</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
