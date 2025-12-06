import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, FlatList, SafeAreaView,TouchableOpacity} from 'react-native';

import { styles } from '../styles/UseEffectScreen.styles.js';

const UseEffectScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ТАЙМЕР ⏱️
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`HTTP ошибка! Статус: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка загрузки данных:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  useEffect(() => {
    console.log('Компонент UseEffectScreen смонтирован');
    return () => {
      console.log('Компонент UseEffectScreen размонтирован');
    };
  }, []);


  useEffect(() => {
    if (users.length > 0) {
      console.log(`Загружено ${users.length} пользователей`);
    }
  }, [users]); 

  // Функции для таймера
  const startTimer = () => setIsTimerRunning(true);
  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>📧 {item.email}</Text>
        <Text style={styles.userCompany}>🏢 {item.company.name}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка данных...</Text>
        
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Ошибка: {error}</Text>
        <Text style={styles.retryText} onPress={handleRefresh}>
          Нажмите для повторной попытки
        </Text>
        <Text style={styles.timerText}>
          ⏱️ Таймер: {formatTime(timer)}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ТАЙМЕР ПАНЕЛЬ */}
      <View style={styles.timerSection}>
        <Text style={styles.timerTitle}>Таймер</Text>
        <Text style={styles.timerDisplay}>{formatTime(timer)}</Text>
        <View style={styles.timerButtons}>
          <TouchableOpacity
            style={[styles.timerButton, isTimerRunning && styles.timerButtonActive]}
            onPress={isTimerRunning ? pauseTimer : startTimer}
          >
            <Text style={styles.timerButtonText}>
              {isTimerRunning ? '⏸️ Пауза' : '▶️ Старт'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.timerButton}
            onPress={resetTimer}
          >
            <Text style={styles.timerButtonText}>🔄 Сброс</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ПОЛЬЗОВАТЕЛИ */}
      <View style={styles.header}>
        <Text style={styles.title}>useEffect Демо</Text>
        <Text style={styles.subtitle}>
          Загружено пользователей: {users.length}
        </Text>
        <Text style={styles.refreshText} onPress={handleRefresh}>
          🔄 Обновить данные
        </Text>
      </View>

      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default UseEffectScreen;