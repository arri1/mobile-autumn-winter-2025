import { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  Switch,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UseEffectStyles } from '../styles/UseEffectStyles';

export default function UseEffectScreen({ goBack }) {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const abortRef = useRef(null);

  const fetchUser = async (id = userId) => {
    try {
      setLoading(true);
      setFetchError(null);
      const controller = new AbortController();
      abortRef.current = controller;
      
       const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        signal: controller.signal,
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ошибка: ${res.status}`);
      }
      
      const json = await res.json();
      setUser(json);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Ошибка загрузки:', e);
        setFetchError('Не удалось загрузить данные. Network request failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [userId]);

  const [seconds, setSeconds] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s > 0 && s % 10 === 0) {
          const randomId = 1 + Math.floor(Math.random() * 10);
          setUserId(randomId);
        }
        return s + 1;
      });
    }, 1000);
    
    return () => clearInterval(id);
  }, [autoRefresh]);

  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Привет, гость!');
  
  useEffect(() => {
    setGreeting(`Привет, ${name || 'гость'}!`);
  }, [name]);

  const [clickCount, setClickCount] = useState(0);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (clickCount >= 5) {
      const fetchMultipleUsers = async () => {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
          const data = await res.json();
          setUsersList(data);
        } catch (error) {
          console.error('Ошибка загрузки списка:', error);
        }
      };
      fetchMultipleUsers();
    }
  }, [clickCount]);

  return (
    <LinearGradient
      colors={['#0D1B2A', '#1B263B', '#2C3E50']}
      style={UseEffectStyles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={UseEffectStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={UseEffectStyles.header}>
            <TouchableOpacity 
              style={UseEffectStyles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
              <Text style={UseEffectStyles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={UseEffectStyles.headerCenter}>
              <View style={UseEffectStyles.titleBadge}>
                <Text style={UseEffectStyles.titleBadgeText}>✨ useEffect</Text>
              </View>
              <Text style={UseEffectStyles.headerSubtitle}>Побочные эффекты</Text>
            </View>
            <View style={UseEffectStyles.headerPlaceholder} />
          </View>

          {/* Декоративные снежинки */}
          <View style={UseEffectStyles.snowflakeContainer}>
            <Text style={UseEffectStyles.snowflake}>❄️</Text>
            <Text style={[UseEffectStyles.snowflake, UseEffectStyles.snowflake2]}>❄️</Text>
            <Text style={[UseEffectStyles.snowflake, UseEffectStyles.snowflake3]}>❄️</Text>
          </View>

          {/* Error Card */}
          {fetchError && (
            <View style={UseEffectStyles.cardWrapper}>
              <LinearGradient
                colors={['#800707ff', '#D32F2F', '#B30000']}
                style={UseEffectStyles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={UseEffectStyles.cardHeader}>
                  <View style={UseEffectStyles.cardIcon}>
                    <Ionicons name="warning" size={28} color="white" />
                  </View>
                  <View style={UseEffectStyles.cardTitleContainer}>
                    <Text style={UseEffectStyles.cardTitle}>Ошибка загрузки</Text>
                    <Text style={UseEffectStyles.cardDescription}>Санта не смог доставить подарок</Text>
                  </View>
                </View>
                <Text style={UseEffectStyles.errorMessage}>{fetchError}</Text>
                <View style={UseEffectStyles.buttonRow}>
                  <TouchableOpacity 
                    style={UseEffectStyles.ghostButton}
                    onPress={() => fetchUser()}
                    activeOpacity={0.8}
                  >
                    <Text style={UseEffectStyles.ghostButtonText}>Повторить попытку</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Random User Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={UseEffectStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="person" size={28} color="white" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>Праздничные гости</Text>
                  <Text style={UseEffectStyles.cardDescription}>Загрузка данных при изменении ID</Text>
                </View>
              </View>
              
              {loading ? (
                <View style={UseEffectStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#FFD700" />
                  <Text style={UseEffectStyles.loadingText}>Ищем гостя в списке Санты...</Text>
                </View>
              ) : (
                <>
                  <View style={UseEffectStyles.userInfoContainer}>
                    {user ? (
                      <>
                        <Text style={UseEffectStyles.userName}>{user.name}</Text>
                        <View style={UseEffectStyles.userDetails}>
                          <View style={UseEffectStyles.userDetailItem}>
                            <Ionicons name="mail" size={18} color="#FFD700" />
                            <Text style={UseEffectStyles.userDetailText}>Email: {user.email}</Text>
                          </View>
                          <View style={UseEffectStyles.userDetailItem}>
                            <Ionicons name="location" size={18} color="#FFD700" />
                            <Text style={UseEffectStyles.userDetailText}>Город: {user.address?.city || 'Северный полюс'}</Text>
                          </View>
                        </View>
                      </>
                    ) : (
                      <Text style={UseEffectStyles.noDataText}>🎁 Гость ещё не найден</Text>
                    )}
                  </View>
                </>
              )}
              
              <View style={UseEffectStyles.buttonRow}>
                <TouchableOpacity 
                  style={UseEffectStyles.actionButton}
                  onPress={() => {
                    const randomId = 1 + Math.floor(Math.random() * 10);
                    setUserId(randomId);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#0b490fff','#35aa3dff']}
                    style={UseEffectStyles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="shuffle" size={20} color="white" />
                    <Text style={UseEffectStyles.actionButtonText}>Случайный гость</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => fetchUser()}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>Обновить</Text>
                </TouchableOpacity>
              </View>

              <View style={UseEffectStyles.switchContainer}>
                <View style={UseEffectStyles.switchLabelContainer}>
                  <Ionicons name="refresh" size={22} color="#FFD700" />
                  <Text style={UseEffectStyles.switchLabel}>Автообновление каждые 10 секунд</Text>
                </View>
                <Switch
                  value={autoRefresh}
                  onValueChange={setAutoRefresh}
                  trackColor={{ false: '#2A2F3A', true: '#35aa3dff' }}
                  thumbColor={autoRefresh ? '#FFFFFF' : '#9AA4B2'}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Timer Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <LinearGradient
              colors={['#2166ceff', '#0d335eff', '#1E3A8A']}
              style={UseEffectStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="timer" size={28} color="white" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>Обратный отсчёт до НГ</Text>
                  <Text style={UseEffectStyles.cardDescription}>setInterval и очистка эффекта</Text>
                </View>
              </View>
              
              <View style={UseEffectStyles.timerContainer}>
                <Text style={UseEffectStyles.timerValue}>{seconds}s</Text>
                <Text style={UseEffectStyles.timerLabel}>До смены гостя: {10 - (seconds % 10)}s</Text>
              </View>
              
              <View style={UseEffectStyles.buttonRow}>
                <TouchableOpacity 
                  style={UseEffectStyles.actionButton}
                  onPress={() => setAutoRefresh((v) => !v)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={autoRefresh ? ['#2166ceff', '#0d335eff'] : ['#FF6B6B', '#FF5252']}
                    style={UseEffectStyles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name={autoRefresh ? "pause" : "play"} size={20} color="white" />
                    <Text style={UseEffectStyles.actionButtonText}>{autoRefresh ? 'Пауза' : 'Старт'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => setSeconds(0)}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>Сброс</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Click Counter Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <LinearGradient
              colors={['#800707ff', '#D32F2F', '#B30000']}
              style={UseEffectStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="gift" size={28} color="white" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>Праздничные сюрпризы</Text>
                  <Text style={UseEffectStyles.cardDescription}>Загрузка при достижении условия</Text>
                </View>
              </View>
              
              <View style={UseEffectStyles.counterContainer}>
                <Text style={UseEffectStyles.counterValue}>{clickCount}</Text>
                <Text style={UseEffectStyles.counterLabel}>Нажатий на подарок</Text>
              </View>
              
              {clickCount >= 5 && usersList.length > 0 && (
                <View style={UseEffectStyles.successContainer}>
                  <View style={UseEffectStyles.successHeader}>
                    <Ionicons name="sparkles" size={28} color="#FFD700" />
                    <Text style={UseEffectStyles.successTitle}>🎉 Сюрприз открыт!</Text>
                  </View>
                  <Text style={UseEffectStyles.successSubtitle}>Список гостей Санты:</Text>
                  {usersList.map((u, index) => (
                    <View key={index} style={UseEffectStyles.userListItem}>
                      <Text style={UseEffectStyles.userListName}>{u.name}</Text>
                      <Text style={UseEffectStyles.userListEmail}>{u.email}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <View style={UseEffectStyles.buttonRow}>
                <TouchableOpacity 
                  style={UseEffectStyles.actionButton}
                  onPress={() => setClickCount(c => c + 1)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#800707ff', '#D32F2F']}
                    style={UseEffectStyles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="gift" size={20} color="white" />
                    <Text style={UseEffectStyles.actionButtonText}>Открыть подарок</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={UseEffectStyles.ghostButton}
                  onPress={() => setClickCount(0)}
                  activeOpacity={0.8}
                >
                  <Text style={UseEffectStyles.ghostButtonText}>Закрыть все</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Greeting Card */}
          <View style={UseEffectStyles.cardWrapper}>
            <LinearGradient
              colors={['#0b490fff','#35aa3dff', '#2E8B57']}
              style={UseEffectStyles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={UseEffectStyles.cardHeader}>
                <View style={UseEffectStyles.cardIcon}>
                  <Ionicons name="chatbubble" size={28} color="white" />
                </View>
                <View style={UseEffectStyles.cardTitleContainer}>
                  <Text style={UseEffectStyles.cardTitle}>Праздничное приветствие</Text>
                  <Text style={UseEffectStyles.cardDescription}>Эффект при изменении текста</Text>
                </View>
              </View>
              
              <TextInput
                style={UseEffectStyles.input}
                value={name}
                onChangeText={setName}
                placeholder="Введите ваше имя для поздравления"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
              />
              
              <View style={UseEffectStyles.greetingContainer}>
                <Ionicons name="sparkles" size={28} color="#FFD700" />
                <Text style={UseEffectStyles.greetingText}>{greeting} 🎄</Text>
              </View>
            </LinearGradient>
          </View>

       

        
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}