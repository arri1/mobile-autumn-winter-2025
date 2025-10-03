import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function UseEffectScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);

  // Простой useEffect для загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Загрузка данных...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив зависимостей - выполнится только при монтировании

  // useEffect для логирования
  useEffect(() => {
    console.log('Количество постов:', posts.length);
  }, [posts]); // Зависимость от posts - выполнится при изменении posts

  // useEffect для счетчика
  useEffect(() => {
    console.log('Счетчик обновлен:', counter);
  }, [counter]); // Зависимость от counter

  const loadData = () => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const showPost = (post: Post) => {
    Alert.alert(post.title, post.body);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#66FCF1" />
          <Text style={styles.loadingText}>Загрузка постов...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>useEffect 🎣</Text>
        
        <View style={styles.counterContainer}>
          <Text style={styles.counterTitle}>Счетчик: {counter}</Text>
          <TouchableOpacity 
            style={styles.counterButton} 
            onPress={incrementCounter}
          >
            <Text style={styles.counterButtonText}>+1</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postsContainer}>
          <Text style={styles.sectionTitle}>Посты с API ({posts.length})</Text>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => showPost(post)}
            >
              <Text style={styles.postTitle}>{post.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={loadData}
          >
            <Text style={styles.primaryButtonText}>Обновить посты</Text>

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#faa1bfff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0e0f0fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingText: {
    color: '#66FCF1',
    fontSize: 16,
    marginTop: 16,
  },
  infoContainer: {
    backgroundColor: '#ea75a7b5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoText: {
    color: '#C5C6C7',
    fontSize: 14,
    marginBottom: 6,
  },
  counterContainer: {
    backgroundColor: '#ebfff28e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000ff',
    marginBottom: 12,
  },
  counterButton: {
    backgroundColor: '#ff859bff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  counterButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 16,
  },
  postsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#009439ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#45A29E',
  },
  postTitle: {
    color: '#C5C6C7',
    fontSize: 14,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#8d1c27ff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0B0C10',
    fontWeight: '700',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: '#2D3748',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  navButtonText: {
    color: '#66FCF1',
    fontWeight: '600',
  },
});