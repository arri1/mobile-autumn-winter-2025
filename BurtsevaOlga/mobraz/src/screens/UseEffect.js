import React, { useState, useEffect, useRef } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ScrollView,Alert,StatusBar} from 'react-native';
import { styles } from '../styles/UseEffectScreen.styles.js';

const UseEffectScreen = ({ navigation }) => {

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerHistory, setTimerHistory] = useState([]);
  const [mountedTime, setMountedTime] = useState(null);
  
  
  const intervalRef = useRef(null);

  // useEffect №1: Выполняется при монтировании компонента
  useEffect(() => {
    const now = new Date();
    setMountedTime(now.toLocaleTimeString());
    
    Alert.alert(
      'Таймер запущен',
      'Компонент успешно загружен. Таймер готов к работе!',
      [{ text: 'OK' }]
    );
  
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      stopTimer();
    });
    
    return () => {
      unsubscribe(); 
      stopTimer(); 
      
      Alert.alert(
        'Таймер остановлен',
        'Компонент был закрыт. Таймер очищен.',
        [{ text: 'OK' }]
      );
    };
  }, [navigation]); 

  // useEffect №2: Основной таймер
  useEffect(() => {
    if (isActive) {
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          

          if (newSeconds % 10 === 0) {
            setTimerHistory(prev => [
              ...prev,
              `Прошло ${newSeconds} секунд (${new Date().toLocaleTimeString()})`
            ]);
          }
          
          return newSeconds;
        });
      }, 1000);
    } else {
      stopTimer();
    }
    
    
    return () => {
      stopTimer();
    };
  }, [isActive]); 


  const stopTimer = () => {
    if (intervalRef.current) {
      console.log('🧹 Интервал очищен');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    
   
    if (seconds === 15) {
      Alert.alert(
        '🎉 15 секунд!',
        'Таймер достиг 15 секунд! Продолжаем отсчет...',
        [{ text: 'Продолжить' }]
      );
    }
    
   
    if (seconds === 60) {
      Alert.alert(
        '🏆 Минута!',
        'Поздравляю! Таймер достиг 1 минуты!',
        [{ text: 'Отлично!' }]
      );
    }
  }, [seconds]); 

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    stopTimer(); 
    setSeconds(0);
    setIsActive(false);
    setTimerHistory([]);
  };

  const addLap = () => {
    if (seconds > 0) {
      setTimerHistory(prev => [
        ...prev,
        `Круг ${prev.length + 1}: ${seconds} сек (${new Date().toLocaleTimeString()})`
      ]);
    }
  };


  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log(' Экран потерял фокус - останавливаем таймер');
      stopTimer();
      setIsActive(false);
    });

    const subscribe = navigation.addListener('focus', () => {
      console.log(' Экран получил фокус');
      
    });

    return () => {
      unsubscribe();
      subscribe();
    };
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      
      <View style={styles.content}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>⏱️ Пример useEffect</Text>
          <Text style={styles.subtitle}>Таймер с функцией очистки</Text>
        </View>

        {/* Информация о монтировании */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Информация о компоненте:</Text>
          <Text style={styles.infoText}>
            • Компонент загружен: {mountedTime || 'загрузка...'}{'\n'}
            • Таймер {isActive ? 'активен' : 'на паузе'}{'\n'}
            • Секунд прошло: {seconds}{'\n'}
            • Кругов в истории: {timerHistory.length}{'\n'}
            • ID интервала: {intervalRef.current ? 'активен' : 'остановлен'}
          </Text>
        </View>

        {/* Основной таймер */}
        <View style={styles.timerCard}>
          <Text style={styles.timerDisplay}>{formatTime(seconds)}</Text>
          <Text style={timerStyles(seconds).timerText}>
            {seconds} {seconds === 1 ? 'секунда' : 
                      seconds < 5 ? 'секунды' : 'секунд'}
          </Text>

          {/* Кнопки управления */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isActive ? styles.pauseButton : styles.startButton]}
              onPress={toggleTimer}
            >
              <Text style={styles.buttonText}>
                {isActive ? '⏸ Пауза' : '▶ Старт'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.lapButton]}
              onPress={addLap}
              disabled={seconds === 0}
            >
              <Text style={[styles.buttonText, seconds === 0 && styles.disabledText]}>
                ⏱ Круг
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={resetTimer}
            >
              <Text style={styles.buttonText}>🔄 Сброс</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* История таймера */}
        {timerHistory.length > 0 && (
          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>📋 История таймера:</Text>
            {timerHistory.slice().reverse().map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        

        {/* Кнопка возврата */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            stopTimer();
            setIsActive(false); 
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.backButtonText}>← Вернуться в меню</Text>
          <Text style={styles.backButtonHint}>
            Таймер будет остановлен автоматически
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

// Динамические стили для таймера
const timerStyles = (seconds) => StyleSheet.create({
  timerText: {
    fontSize: 18,
    color: seconds === 0 ? '#666' : 
           seconds < 30 ? '#34C759' : 
           seconds < 60 ? '#FF9500' : '#FF3B30',
    fontWeight: seconds > 0 ? '600' : '400',
    textAlign: 'center',
    marginTop: 5,
  }
});

export default UseEffectScreen;