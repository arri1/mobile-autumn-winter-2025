import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

export default function PostDetailScreen({ route, navigation }: any) {
  const { postId } = route.params;
  const { currentPost, loading, error, fetchPostById, deletePost } = usePostStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  const handleEdit = () => {
    navigation.navigate('EditPost', { postId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Удаление поста',
      `Вы уверены, что хотите удалить этот пост?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const { ok, error } = await deletePost(postId);
            if (ok) {
              Alert.alert('Успех', 'Пост успешно удален', [
                { text: 'OK', onPress: () => navigation.goBack() },
              ]);
            } else {
              Alert.alert('Ошибка', error || 'Не удалось удалить пост');
            }
          },
        },
      ]
    );
  };

  const isMyPost = currentPost && user && (
    currentPost.author?.email === user.email || 
    (user.id && currentPost.authorId === user.id)
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Загрузка поста...</Text>
      </View>
    );
  }

  if (error || !currentPost) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'Пост не найден'}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => fetchPostById(postId)}
        >
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{currentPost.title}</Text>
        
        <View style={styles.meta}>
          <Text style={styles.author}>
            Автор: {currentPost.author?.name || currentPost.author?.email || 'Неизвестный'}
          </Text>
          <Text style={styles.date}>
            {new Date(currentPost.createdAt).toLocaleString('ru-RU')}
          </Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.contentText}>{currentPost.content}</Text>

        {isMyPost && (
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEdit}
            >
              <Text style={styles.actionButtonText}>Редактировать</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.actionButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  meta: {
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#0000ff',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

