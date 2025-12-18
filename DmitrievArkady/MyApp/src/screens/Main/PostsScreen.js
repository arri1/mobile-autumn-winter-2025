import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Alert,
  TouchableOpacity,
  RefreshControl,
  Modal,
  ActivityIndicator,
  Switch
} from 'react-native';
import { usePostsStore } from '../../stores/usePostsStore';
import { useAuthStore } from '../../stores/useAuthStore';

export default function PostsScreen() {
  const { 
    posts, 
    myPosts, 
    createPost, 
    updatePost,
    deletePost, 
    fetchPosts, 
    fetchMyPosts, 
    isLoading 
  } = usePostsStore();
  
  const { currentUser } = useAuthStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingPost, setEditingPost] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Очистка ошибок при изменении полей
  useEffect(() => {
    if (validationErrors.title && title.trim()) {
      setValidationErrors(prev => ({ ...prev, title: null }));
    }
    if (validationErrors.content && content.trim()) {
      setValidationErrors(prev => ({ ...prev, content: null }));
    }
  }, [title, content]);

  const loadPosts = useCallback(async () => {
    if (!currentUser) return;
    
    setRefreshing(true);
    if (activeTab === 'all') {
      await fetchPosts();
    } else {
      await fetchMyPosts();
    }
    setRefreshing(false);
  }, [currentUser, activeTab, fetchPosts, fetchMyPosts]);

  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  const openCreateModal = () => {
    setModalMode('create');
    setTitle('');
    setContent('');
    setPublished(true);
    setEditingPost(null);
    setValidationErrors({});
    setShowPostModal(true);
  };

  const openEditModal = (post) => {
    setModalMode('edit');
    setTitle(post.title);
    setContent(post.content);
    setPublished(post.published);
    setEditingPost(post);
    setValidationErrors({});
    setShowPostModal(true);
  };

  const formatValidationError = (errors) => {
    if (!errors || !Array.isArray(errors)) return 'Неизвестная ошибка';
    
    const messages = errors.map(error => {
      const field = error.field || error.param;
      const message = error.message || error.msg;
      
      switch(field) {
        case 'title':
          if (message.includes('обязателен')) return 'Заголовок обязателен';
          if (message.includes('минимум')) return 'Заголовок должен содержать минимум 3 символа';
          if (message.includes('превышать')) return 'Заголовок не должен превышать 200 символов';
          return `Заголовок: ${message}`;
          
        case 'content':
          if (message.includes('обязательно')) return 'Содержание обязательно';
          if (message.includes('минимум')) return 'Содержание должно содержать минимум 10 символов';
          return `Содержание: ${message}`;
          
        case 'published':
          return `Статус публикации: ${message}`;
          
        default:
          return message;
      }
    });
    
    return messages.join('\n');
  };

  const handleSavePost = async () => {
    // Очищаем предыдущие ошибки
    setValidationErrors({});
    
    // Базовая проверка на клиенте
    const errors = {};
    
    if (!title.trim()) {
      errors.title = 'Заголовок обязателен';
    } else if (title.trim().length < 3) {
      errors.title = 'Заголовок должен содержать минимум 3 символа';
    } else if (title.trim().length > 200) {
      errors.title = 'Заголовок не должен превышать 200 символов';
    }
    
    if (!content.trim()) {
      errors.content = 'Содержание обязательно';
    } else if (content.trim().length < 10) {
      errors.content = 'Содержание должно содержать минимум 10 символов';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setProcessing(true);
    
    if (modalMode === 'create') {
      const result = await createPost(title, content, published);
      setProcessing(false);
      
      if (result.success) {
        Alert.alert('Успех', 'Пост создан!');
        closeModalAndRefresh();
      } else {
        // Обработка ошибок валидации с сервера
        if (result.validationErrors) {
          const serverErrors = Array.isArray(result.validationErrors) 
            ? formatValidationError(result.validationErrors)
            : JSON.stringify(result.validationErrors);
          
          Alert.alert('Ошибка валидации', serverErrors);
        } else {
          Alert.alert('Ошибка', result.error || 'Не удалось создать пост');
        }
      }
    } else if (modalMode === 'edit' && editingPost) {
      const result = await updatePost(editingPost.id, { 
        title, 
        content, 
        published 
      });
      setProcessing(false);
      
      if (result.success) {
        Alert.alert('Успех', 'Пост обновлен!');
        closeModalAndRefresh();
      } else {
        // Обработка ошибок валидации с сервера
        if (result.validationErrors) {
          const serverErrors = Array.isArray(result.validationErrors) 
            ? formatValidationError(result.validationErrors)
            : JSON.stringify(result.validationErrors);
          
          Alert.alert('Ошибка валидации', serverErrors);
        } else {
          Alert.alert('Ошибка', result.error || 'Не удалось обновить пост');
        }
      }
    }
  };

  const closeModalAndRefresh = async () => {
    setShowPostModal(false);
    setTitle('');
    setContent('');
    setEditingPost(null);
    setValidationErrors({});
    
    // Обновляем список постов
    if (activeTab === 'my') {
      await fetchMyPosts();
    } else {
      await fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Удалить пост?',
      'Это действие нельзя отменить',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: async () => {
            const result = await deletePost(id);
            if (result.success) {
              if (activeTab === 'my') {
                await fetchMyPosts();
              } else {
                await fetchPosts();
              }
              Alert.alert('Успех', 'Пост удален');
            }
          }
        }
      ]
    );
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.post}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>{item.title}</Text>
          {item.author && (
            <Text style={styles.postAuthor}>
              Автор: {item.author.name || item.author.email}
            </Text>
          )}
        </View>
        <Text style={styles.postContent}>{item.content}</Text>
        <View style={styles.postFooter}>
          <Text style={styles.postDate}>
            {new Date(item.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
          <View style={styles.postStatus}>
            <Text style={[
              styles.statusBadge,
              { backgroundColor: item.published ? '#4CAF50' : '#FF9800' }
            ]}>
              {item.published ? "Опубликовано" : "Черновик"}
            </Text>
          </View>
        </View>
        
        {/* Кнопки действий для своих постов */}
        {currentUser && item.author && item.author.id === currentUser.id && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={() => openEditModal(item)}
            >
              <Text style={styles.editButtonText}>Изменить</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.authMessage}>Войдите для просмотра постов</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Переключатель вкладок */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Все посты ({posts.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
            Мои посты ({myPosts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка создания поста */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={openCreateModal}
        >
          <Text style={styles.addButtonText}>+ Создать пост</Text>
        </TouchableOpacity>
      </View>

      {/* Список постов */}
      {isLoading && (posts.length === 0 || myPosts.length === 0) ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Загрузка постов...</Text>
        </View>
      ) : (
        <FlatList
          data={activeTab === 'all' ? posts : myPosts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPostItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadPosts}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {activeTab === 'all' 
                  ? 'Нет постов' 
                  : 'У вас еще нет постов'}
              </Text>
              {activeTab === 'my' && (
                <TouchableOpacity 
                  style={styles.createFirstButton}
                  onPress={openCreateModal}
                >
                  <Text style={styles.createFirstButtonText}>Создать первый пост</Text>
                </TouchableOpacity>
              )}
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Модальное окно создания/редактирования поста */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPostModal}
        onRequestClose={() => {
          setShowPostModal(false);
          setValidationErrors({});
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalMode === 'create' ? 'Новый пост' : 'Редактировать пост'}
            </Text>
            
            {/* Поле заголовка */}
            <View>
              <TextInput
                style={[
                  styles.input,
                  validationErrors.title && styles.inputError
                ]}
                placeholder="Заголовок поста"
                value={title}
                onChangeText={setTitle}
                maxLength={200}
              />
              {validationErrors.title && (
                <Text style={styles.errorText}>{validationErrors.title}</Text>
              )}
            </View>
            
            {/* Поле содержания */}
            <View>
              <TextInput
                style={[
                  styles.input, 
                  styles.contentInput,
                  validationErrors.content && styles.inputError
                ]}
                placeholder="Содержание поста"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                maxLength={5000}
              />
              {validationErrors.content && (
                <Text style={styles.errorText}>{validationErrors.content}</Text>
              )}
            </View>
            
            {/* Переключатель публикации */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                Опубликовать:
              </Text>
              <Switch
                value={published}
                onValueChange={setPublished}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={published ? '#007AFF' : '#f4f3f4'}
              />
              <Text style={styles.switchText}>
                {published ? 'Да' : 'Нет'}
              </Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowPostModal(false);
                  setTitle('');
                  setContent('');
                  setEditingPost(null);
                  setValidationErrors({});
                }}
                disabled={processing}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSavePost}
                disabled={processing || !title.trim() || !content.trim()}
              >
                {processing ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.saveButtonText}>
                    {modalMode === 'create' ? 'Создать' : 'Сохранить'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  postContainer: {
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  post: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
  },
  postContent: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  postDate: {
    fontSize: 12,
    color: '#adb5bd',
  },
  postStatus: {
    flexDirection: 'row',
  },
  statusBadge: {
    fontSize: 10,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#28a745',
  },
  editButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#D93B3B',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#6c757d',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
  },
  createFirstButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createFirstButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  authMessage: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 60,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212529',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  contentInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#495057',
    marginRight: 12,
    flex: 1,
  },
  switchText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
    width: 30,
  },
  validationInfo: {
    backgroundColor: '#e7f5ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#495057',
    marginBottom: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#e9ecef',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});