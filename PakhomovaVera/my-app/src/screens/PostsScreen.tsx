import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/appnavigation';
import { usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { Post } from '../types';

type PostsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Posts'>;

export const PostsScreen: React.FC = () => {
  const navigation = useNavigation<PostsScreenNavigationProp>();
  const { posts, loading, error, loadPosts, createPost, updatePost, deletePost } = usePosts();
  const { authState, logout } = useAuth();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreate = () => {
    setEditingPost(null);
    setTitle('');
    setContent('');
    setModalVisible(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setModalVisible(true);
  };

  const handleDelete = (post: Post) => {
    Alert.alert(
      'Удалить пост',
      `Вы уверены, что хотите удалить пост "${post.title}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const success = await deletePost(post.id);
            if (success) {
              Alert.alert('Успешно', 'Пост удален');
            } else {
              const errorMsg = error || 'Не удалось удалить пост';
              if (errorMsg.includes('Доступ запрещен') || errorMsg.includes('войдите') || errorMsg.includes('Токен истек')) {
                Alert.alert(
                  'Требуется авторизация',
                  'Ваша сессия истекла. Пожалуйста, войдите заново.',
                  [
                    { 
                      text: 'OK', 
                      onPress: async () => {
                        await logout();
                        navigation.navigate('Login' as never);
                      }
                    }
                  ]
                );
              } else {
                Alert.alert('Ошибка', errorMsg);
              }
            }
          },
        },
      ]
    );
  };

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    // Клиентская валидация, чтобы не отправлять заведомо неверные данные
    if (!trimmedTitle || !trimmedContent) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if (trimmedTitle.length < 3 || trimmedTitle.length > 200) {
      Alert.alert('Ошибка', 'Заголовок должен быть от 3 до 200 символов');
      return;
    }

    if (trimmedContent.length < 10) {
      Alert.alert('Ошибка', 'Содержимое должно быть не короче 10 символов');
      return;
    }

    try {
      if (editingPost) {
        const updated = await updatePost(editingPost.id, { title: trimmedTitle, content: trimmedContent });
        if (updated) {
          setModalVisible(false);
          Alert.alert('Успешно', 'Пост обновлен');
        } else {
          Alert.alert('Ошибка', error || 'Не удалось обновить пост');
        }
      } else {
        const created = await createPost({ title: trimmedTitle, content: trimmedContent });
        if (created) {
          setModalVisible(false);
          setTitle('');
          setContent('');
          Alert.alert('Успешно', 'Пост создан');
        } else {
          const errorMsg = error || 'Не удалось создать пост';
          if (errorMsg.includes('Доступ запрещен') || errorMsg.includes('войдите') || errorMsg.includes('Токен истек')) {
            Alert.alert(
              'Требуется авторизация',
              'Ваша сессия истекла. Пожалуйста, войдите заново.',
              [
                { 
                  text: 'OK', 
                  onPress: async () => {
                    await logout();
                    navigation.navigate('Login' as never);
                  }
                }
              ]
            );
          } else {
            Alert.alert('Ошибка', errorMsg);
          }
        }
      }
    } catch (err: any) {
      Alert.alert('Ошибка', err.message || 'Произошла ошибка');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.title}</Text>
        {authState.isAuthenticated && (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles.actionButton}
            >
              <Text style={styles.editButton}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.actionButton}
            >
              <Text style={styles.deleteButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postFooter}>
        {item.author && (
          <Text style={styles.postAuthor}>
            Автор: {item.author.name || item.author.email}
          </Text>
        )}
        <Text style={styles.postDate}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {authState.isAuthenticated && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <Text style={styles.createButtonText}>+ Создать пост</Text>
        </TouchableOpacity>
      )}

      {loading && posts.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Загрузка постов...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadPosts} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Нет постов</Text>
              <Text style={styles.emptySubtext}>
                {authState.isAuthenticated
                  ? 'Создайте первый пост'
                  : 'Войдите, чтобы создать пост'}
              </Text>
            </View>
          }
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingPost ? 'Редактировать пост' : 'Создать пост'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Заголовок"
              value={title}
              onChangeText={setTitle}
              multiline={false}
            />

            <TextInput
              style={[styles.input, styles.contentInput]}
              placeholder="Содержание"
              value={content}
              onChangeText={setContent}
              multiline={true}
              numberOfLines={6}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>
                  {editingPost ? 'Сохранить' : 'Создать'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 4,
  },
  editButton: {
    fontSize: 20,
  },
  deleteButton: {
    fontSize: 20,
  },
  postContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  postAuthor: {
    fontSize: 12,
    color: '#999',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 500,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  contentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#e9ecef',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

