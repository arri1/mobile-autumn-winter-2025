import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  SafeAreaView,
  StatusBar 
} from 'react-native';

import { useColorScheme } from 'react-native';

export default function UseStateScreen() {

  const systemColorScheme = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
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
    uselessInfo: {
      marginTop: 30,
      padding: 15,
      backgroundColor: currentTheme.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    uselessText: {
      color: currentTheme.text,
      fontStyle: 'italic',
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
            thumbColor={isDarkMode ? '#00ff62ff' : '#f4f3f4'}
            trackColor={{ false: '#ff0000ff', true: '#00ff62ff' }}
            />
        </View>
        </View>

    </SafeAreaView>
  );
}

