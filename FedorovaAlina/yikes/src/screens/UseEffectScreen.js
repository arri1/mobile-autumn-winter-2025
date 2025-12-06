//
import { useEffect, useRef, useState } from 'react';
import { 
  StatusBar, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  Switch,
  TouchableOpacity,
  View 
} from 'react-native';

export default function UseEffectScreen({ goBack }) {  // Добавлен параметр goBack
  // Fetch demo - загрузка случайного пользователя
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

  // Interval demo
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

  // Dependent effect
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('Привет, гость!');
  
  useEffect(() => {
    setGreeting(`Привет, ${name || 'гость'}!`);
  }, [name]);

  // Клик-счетчик эффект
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Добавлен заголовок с кнопкой возврата */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>useEffect с Random Data API</Text>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Text style={styles.backButtonText}>← Назад</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitle}>
            Используем API как у учителя: fetch('https://jsonplaceholder.typicode.com/users/')
          </Text>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>⚛️</Text>
          </View>
        </View>

        {/* Блок ошибки */}
        {fetchError && (
          <View style={[styles.card, styles.errorCard]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, styles.errorText]}>Ошибка загрузки</Text>
              <View style={[styles.pill, styles.errorPill]}>
                <Text style={styles.pillText}>
                  {fetchError.includes('Network') ? 'network' : 'error'}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.column}>
              <Text style={[styles.helper, styles.errorHelper]}>{fetchError}</Text>
              <View style={[styles.row, styles.spaceBetween]}>
                <TouchableOpacity 
                  style={[styles.counterButton, styles.ghostButton]}
                  onPress={() => fetchUser()}
                >
                  <Text style={styles.btnText}>Повторить</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.counterButton, styles.ghostButton]}
                  onPress={() => abortRef.current?.abort()}
                >
                  <Text style={styles.btnText}>Отменить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Случайный пользователь */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Случайный пользователь (useEffect при монтировании)</Text>
            <View style={[styles.pill, loading ? styles.neutralPill : styles.successPill]}>
              <Text style={styles.pillText}>{loading ? 'loading' : 'loaded'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.column}>
            {loading ? (
              <View style={styles.row}>
                <ActivityIndicator color="#5EEAD4" />
                <Text style={[styles.helper, styles.ml12]}>Загружаем пользователя...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.helper}>Новый пользователь</Text>
                {user ? (
                  <>
                    <Text style={styles.cardTitle}>{user.name}</Text>
                    <Text style={styles.helper}>Email: {user.email}</Text>
                    <Text style={styles.helper}>Город: {user.address?.city || 'Не указан'}</Text>
                    <Text style={styles.helper}>Компания: {user.company?.name || 'Не указана'}</Text>
                  </>
                ) : (
                  <Text style={styles.cardTitle}>—</Text>
                )}
              </>
            )}
            <View style={[styles.row, styles.spaceBetween]}>
              <TouchableOpacity 
                style={[styles.counterButton, styles.ghostButton]}
                onPress={() => {
                  const randomId = 1 + Math.floor(Math.random() * 10);
                  setUserId(randomId);
                }}
              >
                <Text style={styles.btnText}>Случайный ID</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.counterButton, styles.ghostButton]}
                onPress={() => fetchUser()}
              >
                <Text style={styles.btnText}>Обновить</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.helper}>Автообновление (каждые 10 секунд)</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>{autoRefresh ? 'Включено' : 'Выключено'}</Text>
              <Switch
                value={autoRefresh}
                onValueChange={setAutoRefresh}
                trackColor={{ false: '#2a2f3a', true: '#5eead4' }}
                thumbColor={autoRefresh ? '#052925' : '#9aa4b2'}
              />
            </View>
          </View>
        </View>

        {/* Таймер */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Таймер автообновления</Text>
            <View style={[styles.pill, autoRefresh ? styles.successPill : styles.neutralPill]}>
              <Text style={styles.pillText}>{autoRefresh ? 'running' : 'paused'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.counterValue}>{seconds}s</Text>
            <TouchableOpacity 
              style={styles.counterButton}
              onPress={() => setAutoRefresh((v) => !v)}
            >
              <Text style={styles.btnText}>{autoRefresh ? 'Пауза' : 'Старт'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.counterButton, styles.ghostButton]}
              onPress={() => setSeconds(0)}
            >
              <Text style={styles.btnText}>Сброс</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Зависимость от состояния */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Зависимость от состояния (useEffect с параметром)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.column}>
            <Text style={styles.helper}>Счетчик кликов:</Text>
            <Text style={[styles.counterValue, styles.bigCounter]}>{clickCount}</Text>
            
            {clickCount >= 5 && usersList.length > 0 && (
              <View style={styles.successBox}>
                <Text style={styles.successText}>
                  ✓ Достигнуто 5 кликов! Список пользователей загружен.
                </Text>
                {usersList.map((u, index) => (
                  <View key={index} style={styles.userItem}>
                    <Text style={styles.userText}>{u.name} - {u.email}</Text>
                  </View>
                ))}
              </View>
            )}
            
            <View style={[styles.row, styles.spaceBetween]}>
              <TouchableOpacity 
                style={styles.counterButton}
                onPress={() => setClickCount(c => c + 1)}
              >
                <Text style={styles.btnText}>+1 Клик</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.counterButton, styles.ghostButton]}
                onPress={() => setClickCount(0)}
              >
                <Text style={styles.btnText}>Сбросить</Text>
              </TouchableOpacity>
            </View>
            
            {fetchError && clickCount === 3 && (
              <Text style={styles.smallError}>[Ошибка: TypeError: Network request failed]</Text>
            )}
          </View>
        </View>

        {/* Приветствие */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Приветствие (зависимый эффект)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.column}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Введите ваше имя"
              placeholderTextColor="#889096"
            />
            <Text style={styles.helper}>{greeting}</Text>
          </View>
        </View>

        {/* Добавлена кнопка возврата внизу */}
        <TouchableOpacity style={styles.bottomBackButton} onPress={goBack}>
          <Text style={styles.bottomBackButtonText}>← Вернуться на главную страницу</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  emojiContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e6e9ef',
    flex: 1,
  },
  subTitle: {
    color: '#9aa4b2',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#34495e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#0c0f14',
    borderWidth: 1,
    borderColor: '#1c2230',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  errorCard: {
    backgroundColor: '#2c1a1a',
    borderColor: '#5c2b2b',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#e6e9ef',
    fontWeight: '700',
    flex: 1,
    fontSize: 15,
  },
  errorText: {
    color: '#ff6b6b',
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
    color: '#b3b8c3',
  },
  successPill: {
    backgroundColor: '#0e2f25',
    borderColor: '#1f7a4a',
  },
  neutralPill: {
    backgroundColor: '#151a23',
    borderColor: '#252a33',
  },
  errorPill: {
    backgroundColor: '#2c1a1a',
    borderColor: '#5c2b2b',
  },
  divider: {
    height: 1,
    backgroundColor: '#1c2230',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  column: {
    gap: 8,
  },
  counterButton: {
    backgroundColor: '#5eead4',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2a2f3a',
  },
  btnText: {
    color: '#052925',
    fontWeight: '700',
  },
  counterValue: {
    color: '#e6e9ef',
    fontSize: 22,
    fontWeight: '700',
  },
  bigCounter: {
    textAlign: 'center',
    fontSize: 48,
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#0f1218',
    borderWidth: 1,
    borderColor: '#1c2230',
    borderRadius: 12,
    padding: 12,
    color: '#e6e9ef',
  },
  helper: {
    color: '#9aa4b2',
  },
  ml12: {
    marginLeft: 12,
  },
  errorHelper: {
    color: '#ff9999',
  },
  bottomSpacer: {
    height: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchText: {
    color: '#9aa4b2',
    fontSize: 14,
  },
  successBox: {
    backgroundColor: '#0e2f25',
    borderWidth: 1,
    borderColor: '#1f7a4a',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  successText: {
    color: '#5eead4',
    fontWeight: '600',
    marginBottom: 8,
  },
  userItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#1c2f2a',
  },
  userText: {
    color: '#b3b8c3',
    fontSize: 14,
  },
  smallError: {
    color: '#ff6b6b',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 8,
  },
  bottomBackButton: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  bottomBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
