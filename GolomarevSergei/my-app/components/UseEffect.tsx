import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';

export default function UseEffect() {
  // Fetch при загрузке компонента
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    // Загрузка постов при первой загрузке компонента
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Таймер с cleanup
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup функция
    return () => clearInterval(interval);
  }, [timerActive]);

  // Отслеживание изменения значения
  const [inputValue, setInputValue] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // Этот эффект срабатывает каждый раз когда inputValue изменяется
    setCharCount(inputValue.length);
  }, [inputValue]);

  // Отслеживание множественных зависимостей
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setFullName(`${firstName} ${lastName}`.trim());
  }, [firstName, lastName]);

  // Пример 5: Выполнение эффекта с условием
  const [isOnline, setIsOnline] = useState(true);
  const [status, setStatus] = useState('Online');

  useEffect(() => {
    setStatus(isOnline ? '✓ Online' : '✗ Offline');
  }, [isOnline]);

  const resetTimer = () => {
    setSeconds(0);
    setTimerActive(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Примеры useEffect</Text>

      {/* Fetch данних */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Загрузка данных (Fetch)</Text>
        <Text style={styles.description}>useEffect запускается один раз при загрузке</Text>

        {loadingPosts ? (
          <Text style={styles.loadingText}>Загрузка...</Text>
        ) : posts.length > 0 ? (
          <View style={styles.postsList}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postItem}>
                <Text style={styles.postTitle}>
                  {post.id}. {post.title}
                </Text>
                <Text style={styles.postBody} numberOfLines={2}>
                  {post.body}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.emptyText}>Нет данных</Text>
        )}
      </View>

      {/* Таймер */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Таймер (с Cleanup)</Text>
        <Text style={styles.description}>useEffect с очисткой функцией</Text>

        <View style={styles.timerBox}>
          <Text style={styles.timerText}>{seconds}s</Text>
        </View>

        <View style={styles.timerButtonContainer}>
          <TouchableOpacity
            style={[styles.timerButton, timerActive && styles.timerButtonActive]}
            onPress={() => setTimerActive(!timerActive)}
          >
            <Text style={styles.timerButtonText}>
              {timerActive ? 'Пауза' : 'Старт'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetTimerButton} onPress={resetTimer}>
            <Text style={styles.timerButtonText}>Сброс</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.timerNote}>
          При размонтировании компонента интервал очищается
        </Text>
      </View>

      {/* Зависимость от одного значения */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Отслеживание входного поля</Text>
        <Text style={styles.description}>
          useEffect с одной зависимостью [inputValue]
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Введите текст..."
          value={inputValue}
          onChangeText={setInputValue}
          placeholderTextColor="#999"
        />

        <View style={styles.countBox}>
          <Text style={styles.countLabel}>Количество символов:</Text>
          <Text style={styles.countValue}>{charCount}</Text>
        </View>
      </View>

      {/* Множественные зависимости */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Множественные зависимости</Text>
        <Text style={styles.description}>
          useEffect срабатывает при изменении firstName или lastName
        </Text>

        <TextInput
          style={styles.textInput}
          placeholder="Имя..."
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Фамилия..."
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#999"
        />

        <View style={styles.fullNameBox}>
          <Text style={styles.fullNameLabel}>Полное имя:</Text>
          <Text style={styles.fullNameValue}>
            {fullName || '(заполните поля)'}
          </Text>
        </View>
      </View>

      {/* Условное срабатывание */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Условное срабатывание</Text>
        <Text style={styles.description}>useEffect изменяет статус</Text>

        <View style={styles.statusBox}>
          <View
            style={[
              styles.statusIndicator,
              isOnline ? styles.statusOnline : styles.statusOffline,
            ]}
          />
          <Text style={styles.statusText}>{status}</Text>
        </View>

        <TouchableOpacity
          style={[styles.toggleStatus, isOnline && styles.toggleStatusActive]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <Text style={styles.toggleStatusText}>
            {isOnline ? 'Перейти на offline' : 'Перейти на online'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Ключевые моменты useEffect:</Text>
        <Text style={styles.infoBullet}>
          • Без зависимостей: срабатывает после каждого рендера
        </Text>
        <Text style={styles.infoBullet}>
          • Пустой массив []: срабатывает один раз при загрузке
        </Text>
        <Text style={styles.infoBullet}>
          • С зависимостями: срабатывает при их изменении
        </Text>
        <Text style={styles.infoBullet}>
          • Возврат функции: cleanup, срабатывает перед удалением
        </Text>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#999',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  // Fetch
  loadingText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
  postsList: {
    gap: 10,
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  postTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  postBody: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  // Таймер
  timerBox: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  timerButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  timerButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#34C759',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  timerButtonActive: {
    backgroundColor: '#FF9500',
  },
  resetTimerButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  timerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  timerNote: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  // Входное поле
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    color: '#333',
  },
  countBox: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  countLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  countValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  // Полное имя
  fullNameBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  fullNameLabel: {
    fontSize: 12,
    color: '#166534',
    marginBottom: 5,
  },
  fullNameValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
  },
  // Статус
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  statusIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  statusOnline: {
    backgroundColor: '#34C759',
  },
  statusOffline: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggleStatus: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleStatusActive: {
    backgroundColor: '#34C759',
  },
  toggleStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  // Info
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  infoBullet: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  spacer: {
    height: 20,
  },
});
