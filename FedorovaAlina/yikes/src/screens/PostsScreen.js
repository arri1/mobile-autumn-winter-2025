import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { AppStyles } from '../styles/AppStyles';
import { PostsScreenStyles } from '../styles/PostsScreenStyles';

export default function PostsScreen() {
  const { posts, isLoading, error, pagination, getPosts, deletePost } = usePostsStore();
  const { user, activeScreen, setActiveScreen } = useAuthStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(async (page = 1) => {
    const params = {
      page,
      limit: 10,
      published: filter === 'all' ? undefined : filter === 'published' ? true : false,
      search: searchQuery || undefined,
    };
    
    if (filter === 'my') {
      params.authorId = user?.id;
    }
    
    await getPosts(params);
  }, [getPosts, filter, searchQuery, user?.id]);

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts(1);
    setRefreshing(false);
  }, [fetchPosts]);

  const handleSearch = () => {
    fetchPosts(1);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // ИСПРАВЛЕНА: Сначала очищаем currentPost, затем переходим к созданию
  const handleCreatePost = () => {
    // Очищаем текущий пост перед созданием нового
    usePostsStore.getState().clearCurrentPost();
    setActiveScreen('createPost');
  };

  // ИСПРАВЛЕНА: Устанавливаем currentPost для редактирования
  const handleViewPost = (post) => {
    usePostsStore.getState().setCurrentPost(post);
    setActiveScreen('postDetail');
  };

  // ИСПРАВЛЕНА: Устанавливаем currentPost для редактирования
  const handleEditPost = (post) => {
    usePostsStore.getState().setCurrentPost(post);
    setActiveScreen('editPost'); // Используем editPost, а не createPost
  };

  const handleDeletePost = async (post) => {
    Alert.alert(
      'Удалить пост',
      'Вы уверены, что хотите удалить этот пост?',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: async () => {
            const result = await deletePost(post.id);
            if (result) {
              Alert.alert('Успех', 'Пост успешно удален');
              fetchPosts(1);
            }
          }
        },
      ]
    );
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity
      style={PostsScreenStyles.postCard}
      onPress={() => handleViewPost(item)}
      activeOpacity={0.7}
    >
      <View style={PostsScreenStyles.postHeader}>
        <Text style={PostsScreenStyles.postTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={[
          PostsScreenStyles.postStatus,
          item.published ? PostsScreenStyles.statusPublished : PostsScreenStyles.statusDraft
        ]}>
          <Text style={[
            PostsScreenStyles.statusText,
            item.published ? PostsScreenStyles.publishedText : PostsScreenStyles.draftText
          ]}>
            {item.published ? 'ОПУБЛИКОВАНО' : 'ЧЕРНОВИК'}
          </Text>
        </View>
      </View>
      
      <Text style={PostsScreenStyles.postContent} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={PostsScreenStyles.postFooter}>
        <View style={PostsScreenStyles.authorInfo}>
          <View style={PostsScreenStyles.authorAvatar}>
            <Text style={PostsScreenStyles.authorAvatarText}>
              {item.author?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <Text style={PostsScreenStyles.authorName}>
            {item.author?.name || 'Неизвестный автор'}
          </Text>
        </View>
        
        <Text style={PostsScreenStyles.postDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      {item.author?.id === user?.id && (
        <View style={PostsScreenStyles.postActions}>
          <TouchableOpacity
            style={[PostsScreenStyles.actionButton, { 
              backgroundColor: 'rgba(0, 212, 255, 0.1)',
              borderColor: 'rgba(0, 212, 255, 0.3)',
            }]}
            onPress={() => handleEditPost(item)}
            activeOpacity={0.8}
          >
            <Text style={[PostsScreenStyles.actionButtonText, { color: '#00d4ff' }]}>
              Редактировать
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[PostsScreenStyles.actionButton, { 
              backgroundColor: 'rgba(255, 42, 109, 0.1)',
              borderColor: 'rgba(255, 42, 109, 0.3)',
            }]}
            onPress={() => handleDeletePost(item)}
            activeOpacity={0.8}
          >
            <Text style={[PostsScreenStyles.actionButtonText, { color: '#ff2a6d' }]}>
              Удалить
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;
    
    return (
      <View style={PostsScreenStyles.paginationContainer}>
        <TouchableOpacity
          style={[
            PostsScreenStyles.paginationButton,
            pagination.page === 1 && PostsScreenStyles.paginationButtonDisabled
          ]}
          onPress={() => fetchPosts(pagination.page - 1)}
          disabled={pagination.page === 1 || isLoading}
          activeOpacity={0.7}
        >
          <Text style={PostsScreenStyles.paginationButtonText}>Назад</Text>
        </TouchableOpacity>
        
        <Text style={PostsScreenStyles.pageInfo}>
          Страница {pagination.page} из {pagination.totalPages}
        </Text>
        
        <TouchableOpacity
          style={[
            PostsScreenStyles.paginationButton,
            pagination.page === pagination.totalPages && PostsScreenStyles.paginationButtonDisabled
          ]}
          onPress={() => fetchPosts(pagination.page + 1)}
          disabled={pagination.page === pagination.totalPages || isLoading}
          activeOpacity={0.7}
        >
          <Text style={PostsScreenStyles.paginationButtonText}>Вперед</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading && posts.length === 0) {
    return (
      <View style={PostsScreenStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={PostsScreenStyles.safeArea}>
          <View style={PostsScreenStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
            <Text style={PostsScreenStyles.loadingText}>Загрузка постов...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={PostsScreenStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={PostsScreenStyles.safeArea}>
        <ScrollView
          style={PostsScreenStyles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#00d4ff"
              colors={['#00d4ff']}
            />
          }
        >
          {/* Header */}
          <View style={PostsScreenStyles.header}>
            <View style={PostsScreenStyles.headerCenter}>
              <View style={PostsScreenStyles.titleBadge}>
                <Text style={PostsScreenStyles.titleBadgeText}>⌗ ПОСТЫ</Text>
              </View>
              <Text style={PostsScreenStyles.headerSubtitle}>БЛОГ ПЛАТФОРМЫ</Text>
            </View>
            
            <TouchableOpacity
              style={PostsScreenStyles.createButton}
              onPress={handleCreatePost}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={20} color="#00d4ff" />
              <Text style={PostsScreenStyles.createButtonText}>НОВЫЙ ПОСТ</Text>
            </TouchableOpacity>
          </View>

          {/* Разделительная линия */}
          <View style={PostsScreenStyles.cyberLine} />

          {/* Search */}
          <View style={[PostsScreenStyles.cardWrapper, PostsScreenStyles.searchContainer]}>
            <TextInput
              style={PostsScreenStyles.searchInput}
              placeholder="Поиск постов..."
              placeholderTextColor="rgba(255, 255, 255, 0.3)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>

          {/* Filters */}
          <View style={[PostsScreenStyles.cardWrapper, PostsScreenStyles.filterContainer]}>
            {['all', 'published', 'draft', 'my'].map((filterType) => (
              <TouchableOpacity
                key={filterType}
                style={[
                  PostsScreenStyles.filterButton,
                  {
                    backgroundColor: filter === filterType 
                      ? 'rgba(0, 212, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    borderColor: filter === filterType 
                      ? 'rgba(0, 212, 255, 0.5)' 
                      : 'rgba(255, 255, 255, 0.1)',
                  }
                ]}
                onPress={() => handleFilterChange(filterType)}
                activeOpacity={0.7}
              >
                <Text style={[
                  PostsScreenStyles.filterButtonText,
                  {
                    color: filter === filterType 
                      ? '#00d4ff' 
                      : 'rgba(255, 255, 255, 0.7)',
                  }
                ]}>
                  {filterType === 'all' && 'Все'}
                  {filterType === 'published' && 'Опубликованные'}
                  {filterType === 'draft' && 'Черновики'}
                  {filterType === 'my' && 'Мои посты'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Posts List */}
          {posts.length === 0 ? (
            <View style={PostsScreenStyles.emptyContainer}>
              <Ionicons name="document-text-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
              <Text style={PostsScreenStyles.emptyText}>
                {filter === 'my' 
                  ? 'У вас еще нет постов. Создайте первый!' 
                  : 'Посты не найдены.'}
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderPostItem}
                scrollEnabled={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
              />
              {renderPagination()}
            </>
          )}

          {/* Пробел для нижней навигации */}
          <View style={AppStyles.bottomSpacer}></View>
        </ScrollView>
      </SafeAreaView>

      {/* Нижняя док-панель для навигации */}
      <View style={AppStyles.dockContainer}>
        <View style={AppStyles.dock}>
          {/* Главный экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('home')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="home" size={24} color={activeScreen === 'home' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'home' && AppStyles.dockTextActive]}>
              Home
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useState экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usestate')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="git-branch" size={24} color={activeScreen === 'usestate' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usestate' && AppStyles.dockTextActive]}>
              useState
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useEffect экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('useeffect')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="infinite" size={24} color={activeScreen === 'useeffect' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'useeffect' && AppStyles.dockTextActive]}>
              useEffect
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* useMemo экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('usememo')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="flash" size={24} color={activeScreen === 'usememo' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'usememo' && AppStyles.dockTextActive]}>
              useMemo
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* Посты экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('posts')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="document-text" size={24} color={activeScreen === 'posts' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'posts' && AppStyles.dockTextActive]}>
              Посты
            </Text>
          </TouchableOpacity>

          <View style={AppStyles.dockDivider}></View>

          {/* Profile экран */}
          <TouchableOpacity 
            style={AppStyles.dockItem}
            onPress={() => setActiveScreen('profile')}
            activeOpacity={0.7}
          >
            <View style={AppStyles.dockIcon}>
              <Ionicons name="person" size={24} color={activeScreen === 'profile' ? '#00d4ff' : '#ffffff'} />
            </View>
            <Text style={[AppStyles.dockText, activeScreen === 'profile' && AppStyles.dockTextActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}