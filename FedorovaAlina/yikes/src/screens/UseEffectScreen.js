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
      colors={['#0A0A0A', '#1A1A2E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={goBack}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={28} color="white" />
              <Text style={styles.backButtonText}>Назад</Text>
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.headerTitle}>useEffect</Text>
              <Text style={styles.headerSubtitle}>Побочные эффекты</Text>
            </View>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Error Card */}
          {fetchError && (
            <View style={styles.cardWrapper}>
              <LinearGradient
                colors={['rgba(255, 107, 107, 0.1)', 'rgba(255, 82, 82, 0.1)']}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Ionicons name="warning" size={24} color="#FF6B6B" />
                  <Text style={[styles.cardTitle, styles.errorText]}>Ошибка загрузки</Text>
                  <View style={styles.pill}>
                    <Text style={styles.pillText}>
                      {fetchError.includes('Network') ? 'network' : 'error'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.errorMessage}>{fetchError}</Text>
                <View style={styles.buttonRow}>
                  <TouchableOpacity 
                    style={styles.ghostButton}
                    onPress={() => fetchUser()}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.ghostButtonText}>Повторить</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.ghostButton}
                    onPress={() => abortRef.current?.abort()}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.ghostButtonText}>Отменить</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Random User Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="person" size={24} color="#667EEA" />
                <Text style={styles.cardTitle}>Случайный пользователь</Text>
                <View style={[styles.pill, loading ? styles.loadingPill : styles.successPill]}>
                  <Text style={styles.pillText}>{loading ? 'loading' : 'loaded'}</Text>
                </View>
              </View>
              
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#667EEA" />
                  <Text style={styles.loadingText}>Загружаем пользователя...</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.cardSubtitle}>Новый пользователь</Text>
                  {user ? (
                    <>
                      <Text style={styles.userName}>{user.name}</Text>
                      <View style={styles.userDetails}>
                        <View style={styles.userDetailItem}>
                          <Ionicons name="mail" size={16} color="#8A8D93" />
                          <Text style={styles.userDetailText}>Email: {user.email}</Text>
                        </View>
                        <View style={styles.userDetailItem}>
                          <Ionicons name="location" size={16} color="#8A8D93" />
                          <Text style={styles.userDetailText}>Город: {user.address?.city || 'Не указан'}</Text>
                        </View>
                        <View style={styles.userDetailItem}>
                          <Ionicons name="business" size={16} color="#8A8D93" />
                          <Text style={styles.userDetailText}>Компания: {user.company?.name || 'Не указана'}</Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.noDataText}>—</Text>
                  )}
                </>
              )}
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    const randomId = 1 + Math.floor(Math.random() * 10);
                    setUserId(randomId);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#667EEA', '#764BA2']}
                    style={styles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="shuffle" size={20} color="white" />
                    <Text style={styles.actionButtonText}>Случайный ID</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.ghostButton}
                  onPress={() => fetchUser()}
                  activeOpacity={0.8}
                >
                  <Text style={styles.ghostButtonText}>Обновить</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.switchContainer}>
                <View style={styles.switchLabelContainer}>
                  <Ionicons name="refresh" size={20} color="#8A8D93" />
                  <Text style={styles.switchLabel}>Автообновление (каждые 10 секунд)</Text>
                </View>
                <Switch
                  value={autoRefresh}
                  onValueChange={setAutoRefresh}
                  trackColor={{ false: '#2A2F3A', true: '#667EEA' }}
                  thumbColor={autoRefresh ? '#FFFFFF' : '#9AA4B2'}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Timer Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(240, 147, 251, 0.1)', 'rgba(245, 87, 108, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="timer" size={24} color="#F093FB" />
                <Text style={styles.cardTitle}>Таймер автообновления</Text>
                <View style={[styles.pill, autoRefresh ? styles.successPill : styles.neutralPill]}>
                  <Text style={styles.pillText}>{autoRefresh ? 'running' : 'paused'}</Text>
                </View>
              </View>
              
              <View style={styles.timerContainer}>
                <Text style={styles.timerValue}>{seconds}s</Text>
                <Text style={styles.timerLabel}>Прошло времени</Text>
              </View>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setAutoRefresh((v) => !v)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={autoRefresh ? ['#F093FB', '#F5576C'] : ['#4ECDC4', '#26A69A']}
                    style={styles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name={autoRefresh ? "pause" : "play"} size={20} color="white" />
                    <Text style={styles.actionButtonText}>{autoRefresh ? 'Пауза' : 'Старт'}</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.ghostButton}
                  onPress={() => setSeconds(0)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.ghostButtonText}>Сброс</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Click Counter Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(79, 172, 254, 0.1)', 'rgba(0, 242, 254, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="hand-left" size={24} color="#4FACFE" />
                <Text style={styles.cardTitle}>Зависимость от состояния</Text>
              </View>
              
              <View style={styles.counterContainer}>
                <Text style={styles.counterValue}>{clickCount}</Text>
                <Text style={styles.counterLabel}>Счетчик кликов</Text>
              </View>
              
              {clickCount >= 5 && usersList.length > 0 && (
                <View style={styles.successContainer}>
                  <View style={styles.successHeader}>
                    <Ionicons name="checkmark-circle" size={24} color="#4FACFE" />
                    <Text style={styles.successTitle}>✓ Достигнуто 5 кликов!</Text>
                  </View>
                  <Text style={styles.successSubtitle}>Список пользователей загружен:</Text>
                  {usersList.map((u, index) => (
                    <View key={index} style={styles.userListItem}>
                      <Text style={styles.userListName}>{u.name}</Text>
                      <Text style={styles.userListEmail}>{u.email}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <View style={styles.buttonRow}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => setClickCount(c => c + 1)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#4FACFE', '#00F2FE']}
                    style={styles.actionButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Ionicons name="add" size={20} color="white" />
                    <Text style={styles.actionButtonText}>+1 Клик</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.ghostButton}
                  onPress={() => setClickCount(0)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.ghostButtonText}>Сбросить</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Greeting Card */}
          <View style={styles.cardWrapper}>
            <LinearGradient
              colors={['rgba(94, 234, 212, 0.1)', 'rgba(5, 41, 37, 0.1)']}
              style={styles.card}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.cardHeader}>
                <Ionicons name="chatbubble" size={24} color="#5EEAD4" />
                <Text style={styles.cardTitle}>Приветствие</Text>
              </View>
              
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Введите ваше имя"
                placeholderTextColor="#8A8D93"
              />
              
              <View style={styles.greetingContainer}>
                <Ionicons name="sparkles" size={24} color="#5EEAD4" />
                <Text style={styles.greetingText}>{greeting}</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 2,
  },
  headerPlaceholder: {
    width: 80,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    marginLeft: 12,
  },
  errorText: {
    color: '#FF6B6B',
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loadingPill: {
    backgroundColor: 'rgba(138, 141, 147, 0.2)',
    borderColor: '#8A8D93',
  },
  successPill: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderColor: '#667EEA',
  },
  neutralPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  errorMessage: {
    color: '#FF9999',
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8A8D93',
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  userDetails: {
    marginBottom: 24,
  },
  userDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userDetailText: {
    fontSize: 14,
    color: '#8A8D93',
    marginLeft: 8,
  },
  noDataText: {
    fontSize: 18,
    color: '#8A8D93',
    textAlign: 'center',
    marginVertical: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#8A8D93',
    fontSize: 14,
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 4,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  ghostButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ghostButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#8A8D93',
    fontSize: 14,
    marginLeft: 8,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#F093FB',
    textShadowColor: 'rgba(240, 147, 251, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  timerLabel: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 8,
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#4FACFE',
    textShadowColor: 'rgba(79, 172, 254, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  counterLabel: {
    fontSize: 14,
    color: '#8A8D93',
    marginTop: 8,
  },
  successContainer: {
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 172, 254, 0.2)',
  },
  successHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4FACFE',
    marginLeft: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#8A8D93',
    marginBottom: 12,
  },
  userListItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  userListName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  userListEmail: {
    fontSize: 12,
    color: '#8A8D93',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(94, 234, 212, 0.1)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(94, 234, 212, 0.2)',
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5EEAD4',
    marginLeft: 12,
    flex: 1,
  },
  spacer: {
    height: 40,
  },
});