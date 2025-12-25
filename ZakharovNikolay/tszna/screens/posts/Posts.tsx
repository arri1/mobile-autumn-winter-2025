import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Alert, Platform, StatusBar } from 'react-native';
import { usePostStore, Post } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

export default function PostsScreen({ navigation }: any) {
  const { posts, myPosts, loading, error, fetchPosts, fetchMyPosts, createPost, deletePost } = usePostStore();
  const { isAuthenticated, token } = useAuthStore();
  const [mode, setMode] = useState<'all' | 'my'>('all');
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [creating, setCreating] = useState(false);
  const [searchAuthor, setSearchAuthor] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    if (mode === 'all') {
      fetchPosts();
    } else {
      fetchMyPosts();
    }
  }, [mode]);

  const handleRefresh = () => {
    if (mode === 'all') {
      fetchPosts();
    } else {
      fetchMyPosts();
    }
  };

  const handleModeChange = (newMode: 'all' | 'my') => {
    setMode(newMode);
    // Сбрасываем фильтры при переключении режима
    if (newMode === 'all') {
      setSearchAuthor('');
      setSortOrder('newest');
    } else {
      setCreateTitle('');
      setCreateContent('');
    }
  };

  const handlePostPress = (post: Post) => {
    navigation.navigate('PostDetail', { postId: post.id });
  };

  const handleCreateSubmit = async () => {
    if (!createTitle.trim()) {
      Alert.alert('Ошибка', 'Введите заголовок поста');
      return;
    }

    if (!createContent.trim()) {
      Alert.alert('Ошибка', 'Введите содержание поста');
      return;
    }

    setCreating(true);
    const { ok, error } = await createPost(createTitle.trim(), createContent.trim());
    setCreating(false);

    if (ok) {
      setCreateTitle('');
      setCreateContent('');
      // Обновляем текущий список
      if (mode === 'all') {
        fetchPosts();
      } else {
        fetchMyPosts();
      }
      Alert.alert('Успех', 'Пост успешно создан');
    } else {
      Alert.alert('Ошибка', error || 'Не удалось создать пост');
    }
  };

  const handleEditPress = (post: Post) => {
    navigation.navigate('EditPost', { postId: post.id });
  };

  const handleDeletePress = (post: Post) => {
    Alert.alert(
      'Удаление поста',
      `Вы уверены, что хотите удалить пост "${post.title}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const { ok, error } = await deletePost(post.id);
            if (ok) {
              Alert.alert('Успех', 'Пост успешно удален');
            } else {
              Alert.alert('Ошибка', error || 'Не удалось удалить пост');
            }
          },
        },
      ]
    );
  };

  const renderAllPostsItem = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={styles.postItem}
      onPress={() => handlePostPress(item)}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.postAuthor}>
          {item.author?.name || item.author?.email || 'Неизвестный автор'}
        </Text>
        <Text style={styles.postDate}>
          {new Date(item.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderMyPostsItem = ({ item }: { item: Post }) => (
    <View style={styles.postItem}>
      <TouchableOpacity onPress={() => handlePostPress(item)}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.postDate}>
          {new Date(item.createdAt).toLocaleDateString('ru-RU')}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.postActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditPress(item)}
        >
          <Text style={styles.actionButtonText}>Редактировать</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeletePress(item)}
        >
          <Text style={styles.actionButtonText}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Фильтрация и сортировка постов
  const getFilteredAndSortedPosts = () => {
    let filtered = mode === 'all' ? posts : myPosts;
    
    // Поиск по автору
    if (mode === 'all' && searchAuthor.trim()) {
      const searchTerm = searchAuthor.trim().toLowerCase();
      filtered = filtered.filter(post => {
        const authorName = post.author?.name?.toLowerCase() || '';
        const authorEmail = post.author?.email?.toLowerCase() || '';
        return authorName.includes(searchTerm) || authorEmail.includes(searchTerm);
      });
    }
    
    // Сортировка по времени
    if (mode === 'all') {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
    }
    
    return filtered;
  };

  const currentPosts = getFilteredAndSortedPosts();
  const currentLoading = loading && (mode === 'all' ? posts.length === 0 : myPosts.length === 0);
  const currentError = error && (mode === 'all' ? posts.length === 0 : myPosts.length === 0);

  if (currentLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>
          {mode === 'all' ? 'Загрузка постов...' : 'Загрузка моих постов...'}
        </Text>
      </View>
    );
  }

  if (currentError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Повторить</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'all' && styles.modeButtonActive]}
          onPress={() => handleModeChange('all')}
        >
          <Text style={[styles.modeButtonText, mode === 'all' && styles.modeButtonTextActive]}>
            Все посты
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modeButton, mode === 'my' && styles.modeButtonActive]}
          onPress={() => handleModeChange('my')}
        >
          <Text style={[styles.modeButtonText, mode === 'my' && styles.modeButtonTextActive]}>
            Мои посты
          </Text>
        </TouchableOpacity>
      </View>

      {mode === 'all' ? (
        <View style={styles.filterForm}>
          <Text style={styles.formLabel}>Поиск по автору</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Введите имя или email автора"
            value={searchAuthor}
            onChangeText={setSearchAuthor}
          />

          <Text style={styles.formLabel}>Сортировка по времени</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortOrder === 'newest' && styles.sortButtonActive]}
              onPress={() => setSortOrder('newest')}
            >
              <Text style={[styles.sortButtonText, sortOrder === 'newest' && styles.sortButtonTextActive]}>
                Сначала новые
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortOrder === 'oldest' && styles.sortButtonActive]}
              onPress={() => setSortOrder('oldest')}
            >
              <Text style={[styles.sortButtonText, sortOrder === 'oldest' && styles.sortButtonTextActive]}>
                Сначала старые
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.createForm}>
          <Text style={styles.formLabel}>Заголовок</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Введите заголовок поста"
            value={createTitle}
            onChangeText={setCreateTitle}
            maxLength={200}
          />

          <Text style={styles.formLabel}>Содержание</Text>
          <TextInput
            style={[styles.formInput, styles.formTextArea]}
            placeholder="Введите содержание поста"
            value={createContent}
            onChangeText={setCreateContent}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <View style={styles.formActions}>
            <TouchableOpacity 
              style={[styles.formButton, styles.submitButton, creating && styles.buttonDisabled]}
              onPress={handleCreateSubmit}
              disabled={creating}
            >
              {creating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Создать</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <FlatList
        data={currentPosts}
        renderItem={mode === 'all' ? renderAllPostsItem : renderMyPostsItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {mode === 'all' ? 'Постов пока нет' : 'У вас пока нет постов'}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    gap: 12,
    alignItems: 'center',
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#0000ff',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthor: {
    fontSize: 12,
    color: '#999',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
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
    fontSize: 14,
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  createFirstButton: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createFirstButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterForm: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  createForm: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortButtonActive: {
    backgroundColor: '#0000ff',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#fff',
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  formTextArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  formActions: {
    flexDirection: 'row',
    gap: 12,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#0000ff',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

