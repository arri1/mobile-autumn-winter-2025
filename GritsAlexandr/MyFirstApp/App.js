import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.text }]}>
          Приложение!
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          {isDarkMode ? 'Тёмная тема активна' : 'Светлая тема активна'}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title={isDarkMode ? "Переключить на светлую" : "Переключить на тёмную"}
            onPress={toggleTheme}
            color={theme.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const lightTheme = {
  background: '#fff',
  text: '#000',
  button: '#007AFF',
};

const darkTheme = {
  background: '#1c1c1c',
  text: '#fff',
  button: '#6c63ff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 300,
  },
});