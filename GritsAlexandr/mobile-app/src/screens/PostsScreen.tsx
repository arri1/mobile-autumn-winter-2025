import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { createPostsStyles } from '../styles/postsStyles';
import PostModal from '../components/PostModal';
import { Post } from '../service/api';

const PostsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useAppStore();
  const { user } = useAuthStore();
  const {
    posts,
    currentPost,
    isLoading,
    error,
    pagination,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    togglePublish,
    setCurrentPost,
    clearError,
  } = usePostsStore();

  const styles = createPostsStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Загрузка постов при монтировании
  useEffect(() => {
    loadPosts();
  }, []);

  // Обработка ошибок
  useEffect(() => {
    if (error) {
      Alert.alert('Ошибка', error);
      clearError();
    }
  }, [error]);

  const loadPosts = async (page = 1) => {
    try {
      await fetchPosts(page);
    } catch (error) {
      // Ошибка уже обработана в store
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleCreatePost = async (postData: any) => {
    try {
      await createPost(postData);
      Alert.alert('Успех', 'Пост успешно создан!');
    } catch (error) {
      // Ошибка уже обработана
    }
  };

  const handleUpdatePost = async (postData: any) => {
    if (!currentPost) return;
    
    try {
      await updatePost(currentPost.id, postData);
      Alert.alert('Успех', 'Пост успешно обновлен!');
    } catch (error) {
      // Ошибка уже обработана
    }
  };

  const handleDeletePost = (post: Post) => {
    Alert.alert(
      'Удаление поста',
      `Вы уверены, что хотите удалить пост "${post.title}"?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(post.id);
              Alert.alert('Успех', 'Пост успешно удален!');
            } catch (error) {
              // Ошибка уже обработана
            }
          },
        },
      ]
    );
  };

  const handleTogglePublish = async (post: Post) => {
    try {
      await togglePublish(post.id);
      Alert.alert(
        'Успех',
        `Пост ${post.published ? 'скрыт' : 'опубликован'}!`
      );
    } catch (error) {
      // Ошибка уже обработана
    }
  };

  const handleEditPost = (post: Post) => {
    setCurrentPost(post);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const handleAddPost = () => {
    setCurrentPost(null);
    setIsEditMode(false);
    setModalVisible(true);
  };

  const renderPostItem = ({ item }: { item: Post }) => {
    // Безопасное получение данных автора
    const authorName = item.author?.name || 'Неизвестный автор';
    const authorEmail = item.author?.email || '';
    const authorId = item.author?.id || '';
    
    const isAuthor = user?.id === item.authorId || user?.id === authorId;
    const authorInitial = authorName?.charAt(0)?.toUpperCase() || '?';
    const formattedDate = item.createdAt 
      ? new Date(item.createdAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'Дата не указана';

    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle} numberOfLines={2}>
            {item.title || 'Без названия'}
          </Text>
          <TouchableOpacity
            onPress={() => handleTogglePublish(item)}
            disabled={!isAuthor}
          >
            <View style={[
              styles.postStatus,
              item.published ? styles.statusPublished : styles.statusDraft,
            ]}>
              <Text style={[
                styles.statusText,
                { color: item.published ? '#16a34a' : '#6b7280' }
              ]}>
                {item.published ? 'Опубликован' : 'Черновик'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.postContent} numberOfLines={3}>
          {item.content || 'Нет содержания'}
        </Text>

        <View style={styles.postFooter}>
          <View style={styles.authorInfo}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitial}>
                {authorInitial}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>
                {authorName}
              </Text>
              {authorEmail ? (
                <Text style={[styles.postDate, { fontSize: 10, marginTop: 2 }]}>
                  {authorEmail}
                </Text>
              ) : null}
            </View>
          </View>
          
          <Text style={styles.postDate}>
            {formattedDate}
          </Text>
        </View>

        {/* Кнопки действий (только для автора) */}
        {isAuthor && (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleEditPost(item)}
            >
              <Text style={[styles.actionText, styles.editText]}>
                Редактировать
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeletePost(item)}
            >
              <Text style={[styles.actionText, styles.deleteText]}>
                Удалить
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Нет постов</Text>
      <Text style={styles.emptySubtext}>
        Создайте первый пост, нажав на кнопку "+"
      </Text>
    </View>
  );

  const renderPagination = () => {
    if (posts.length === 0) return null;

    return (
      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.pageButton,
            !pagination.hasPrev && styles.pageButtonDisabled,
          ]}
          onPress={() => loadPosts(pagination.currentPage - 1)}
          disabled={!pagination.hasPrev || isLoading}
        >
          <Text style={styles.pageButtonText}>← Назад</Text>
        </TouchableOpacity>

        <Text style={styles.pageButtonText}>
          Страница {pagination.currentPage} из {pagination.totalPages || 1}
        </Text>

        <TouchableOpacity
          style={[
            styles.pageButton,
            !pagination.hasNext && styles.pageButtonDisabled,
          ]}
          onPress={() => loadPosts(pagination.currentPage + 1)}
          disabled={!pagination.hasNext || isLoading}
        >
          <Text style={styles.pageButtonText}>Вперед →</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Безопасное отображение информации о пользователе в заголовке
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';
  const userName = user?.name || 'Пользователь';

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Посты</Text>
          <Text style={styles.headerSubtitle}>
            Всего: {pagination.totalCount || 0}
          </Text>
        </View>
        
        {user && (
          <View style={styles.authorInfo}>
            <View style={styles.authorAvatar}>
              <Text style={styles.authorInitial}>
                {userInitial}
              </Text>
            </View>
            <Text style={styles.authorName}>
              {userName}
            </Text>
          </View>
        )}
      </View>

      {/* Список постов */}
      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={[styles.emptyText, { marginTop: 16 }]}>
            Загрузка постов...
          </Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id || Math.random().toString()}
          contentContainerStyle={posts.length === 0 ? { flex: 1 } : styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#2563eb']}
            />
          }
        />
      )}

      {/* Пагинация */}
      {renderPagination()}

      {/* Кнопка создания поста */}
      <TouchableOpacity style={styles.fab} onPress={handleAddPost}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Модальное окно для создания/редактирования */}
      <PostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={isEditMode ? handleUpdatePost : handleCreatePost}
        initialData={currentPost}
        isLoading={isLoading}
        isEdit={isEditMode}
      />
    </View>
  );
};

export default PostsScreen;