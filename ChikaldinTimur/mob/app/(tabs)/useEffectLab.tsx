import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { AuthGuard } from '@/components/auth-guard';

type Post = {
  id: number;
  title: string;
};

export default function UseEffectLab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = (await response.json()) as Post[];
      setPosts(data);
    } catch (e) {
      setError('Не удалось загрузить данные. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthGuard>
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Пример useEffect с загрузкой данных</Text>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={styles.infoText}>Загрузка...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={[styles.infoText, styles.errorText]}>{error}</Text>
          <Button title="Повторить" onPress={loadPosts} />
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button title="Обновить данные" onPress={loadPosts} disabled={loading} />
      </View>
    </SafeAreaView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    marginTop: 24,
  },
  infoText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
  },
  footer: {
    paddingVertical: 8,
  },
});


