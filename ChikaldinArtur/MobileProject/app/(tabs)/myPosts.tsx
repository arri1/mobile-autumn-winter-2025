import { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { fetchMyPosts, Post } from '../apiPosts/posts';
import { useAuthStore } from '../store';

export default function MyPostsScreen() {
  const { token } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMyPosts = async (pageNum = 1, isRefresh = false) => {
    if (!token) {
      alert('Вы не авторизованы');
      router.replace('/login');
      return;
    }

    setLoading(true);
    try {
      const data = await fetchMyPosts(pageNum, 10);
      if (isRefresh) {
        setPosts(data.posts);
      } else {
        setPosts((prev) => [...prev, ...data.posts]);
      }
      setHasMore(data.pagination.hasNext);
      setPage(pageNum);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка загрузки ваших постов');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadMyPosts(1, true);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadMyPosts(1, true);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMyPosts(page + 1);
    }
  };

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => router.push(`/post/${item.id}`)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {item.content}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.status}>
          {item.published ? 'Опубликовано' : 'Черновик'}
        </Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator style={{ margin: 20 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>У вас пока нет постов</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/createPost')}
            >
              <Text style={styles.createButtonText}>Создать первый пост</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/createPost')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  postCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});