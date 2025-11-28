import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity,
  SafeAreaView,
  AppState
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [count, setCount] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    console.log('HomeScreen загружен');
    loadInitialData();
    return () => {
      console.log('HomeScreen размонтирован');
    };
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
      console.log('Состояние приложения:', nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log(`Count изменился: ${count}`);
    
    if (count > 5) {
      console.log('Count превысил 5!');
    }
  }, [count]);

  const loadInitialData = async () => {
    setTimeout(() => {
      console.log('Данные загружены');
    }, 1000);
  };

  const handlePress = () => {
    setCount(prev => prev + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Добро пожаловать!</Text>
        <Text style={styles.subtitle}>Count: {count}</Text>
        <Text style={styles.subtitle}>Состояние приложения: {appState}</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Увеличить count ({count})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}