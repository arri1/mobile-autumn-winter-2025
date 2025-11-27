import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setError(null);
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=62.03389&longitude=129.73306&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=Asia%2FYakutsk&forecast_days=1'
      );
      
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Не удалось загрузить данные о погоде');
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchWeatherData();
  };

  const theme = {
    light: {
      background: '#FFFFFF',
      text: '#000000',
      card: '#F5F5F5',
      border: '#E0E0E0',
      button: '#2196F3',
      modalBackground: '#FFFFFF',
    },
    dark: {
      background: '#121212',
      text: '#FFFFFF',
      card: '#1E1E1E',
      border: '#333333',
      button: '#00a100ff',
      inputBackground: '#2D2D2D',
    }
  };

  const currentTheme = theme.dark;

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: 'Ясно',
      1: 'Преимущественно ясно',
      2: 'Переменная облачность',
      3: 'Пасмурно',
      45: 'Туман',
      48: 'Туман с инеем',
      51: 'Морось: слабая',
      53: 'Морось: умеренная',
      55: 'Морось: сильная',
      61: 'Дождь: слабый',
      63: 'Дождь: умеренный',
      65: 'Дождь: сильный',
      80: 'Ливень: слабый',
      81: 'Ливень: умеренный',
      82: 'Ливень: сильный',
      95: 'Гроза',
    };
    return weatherCodes[code] || 'Неизвестно';
  };

  const formatTime = (isoTime) => {
    return new Date(isoTime).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const resetData = () => {
    setWeatherData(null);
    setLoading(true);
    fetchWeatherData();
    setModalVisible(false);
  };

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
    cityName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: currentTheme.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    temperature: {
      fontSize: 48,
      fontWeight: 'bold',
      color: currentTheme.text,
      textAlign: 'center',
      marginVertical: 10,
    },
    weatherDescription: {
      fontSize: 20,
      color: currentTheme.text,
      textAlign: 'center',
      marginBottom: 20,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: currentTheme.border,
    },
    detailLabel: {
      fontSize: 16,
      color: currentTheme.text,
      opacity: 0.8,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.text,
    },
    button: {
      backgroundColor: currentTheme.button,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 5,
    },
    buttonText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    errorText: {
      fontSize: 16,
      color: '#ff4444',
      textAlign: 'center',
      marginVertical: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={currentTheme.button} />
          <Text style={[styles.header, {marginTop: 20}]}>Загрузка погоды...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Погода</Text>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[currentTheme.button]}
          />
        }
      >
        {error ? (
          <View style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
              <Text style={styles.buttonText}>Попробовать снова</Text>
            </TouchableOpacity>
          </View>
        ) : weatherData && weatherData.current ? (
          <View style={styles.card}>
            <Text style={styles.cityName}>Якутск</Text>
            
            <Text style={styles.temperature}>
              {Math.round(weatherData.current.temperature_2m)}°C
            </Text>
            
            <Text style={styles.weatherDescription}>
              {getWeatherDescription(weatherData.current.weather_code)}
            </Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ощущается как</Text>
              <Text style={styles.detailValue}>
                {Math.round(weatherData.current.apparent_temperature)}°C
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Влажность</Text>
              <Text style={styles.detailValue}>
                {weatherData.current.relative_humidity_2m}%
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ветер</Text>
              <Text style={styles.detailValue}>
                {Math.round(weatherData.current.wind_speed_10m)} км/ч
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Осадки</Text>
              <Text style={styles.detailValue}>
                {weatherData.current.precipitation} мм
              </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={resetData}>
              <Text style={styles.buttonText}>Обновить данные</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}