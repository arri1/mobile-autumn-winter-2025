import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { getPosts, createPost, Post, PostsPagination } from '../../api/posts/client';
import { UsersStyles } from '../UserScreen/UserScreenStyle';

type Props = {
  navigation: DrawerNavigationProp<any>;
};

export default function PostsScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PostsPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [creating, setCreating] = useState(false);
  const [publishNow, setPublishNow] = useState(true);

  const loadPosts = useCallback(
    async (page = 1, append = false) => {
      try {
        if (!append) {
          setLoading(true);
          setError(null);
        }

        const response = await getPosts({
          page,
          limit: 10,
          search: search.trim() || undefined,
        });

        const { posts: newPosts, pagination: meta } = response.data;

        setPosts(prev => (append ? [...prev, ...newPosts] : newPosts));
        setPagination(meta);
      } catch (err: any) {
        console.error('Error loading posts:', err);
        setError(err.message || 'Не удалось загрузить посты');
      } finally {
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    },
    [search],
  );

  useEffect(() => {
    loadPosts(1, false);
  }, [loadPosts]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPosts(1, false);
  };

  const loadMore = () => {
    if (loadingMore || !pagination?.hasNext) return;
    setLoadingMore(true);
    loadPosts((pagination.currentPage || 1) + 1, true);
  };

  const handleCreatePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      return;
    }

    try {
      setCreating(true);
      setError(null);

      await createPost({
        title: newTitle.trim(),
        content: newContent.trim(),
        published: publishNow,
      });

      setNewTitle('');
      setNewContent('');
      await loadPosts(1, false);
    } catch (err: any) {
      console.error('Error creating post:', err);
      setError(err.message || 'Не удалось создать пост');
    } finally {
      setCreating(false);
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <View style={UsersStyles.userCard}>
      <View style={UsersStyles.userInfo}>
        <Text style={UsersStyles.userName}>{item.title}</Text>
        <Text style={UsersStyles.userEmail} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={UsersStyles.userRole}>
          Автор: {item.author?.name || item.author?.email || 'Неизвестно'}
        </Text>
        <Text style={UsersStyles.userDate}>
          Статус: {item.published ? 'Опубликован' : 'Черновик (виден только автору)'}
        </Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={UsersStyles.safeArea}>
        <View style={UsersStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#66FCF1" />
          <Text style={{ color: '#C5C6C7', marginTop: 16 }}>Загрузка постов...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={UsersStyles.safeArea}>
        <View style={UsersStyles.errorContainer}>
          <Text style={UsersStyles.errorText}>{error}</Text>
          <TouchableOpacity style={UsersStyles.retryButton} onPress={() => loadPosts(1, false)}>
            <Text style={UsersStyles.retryButtonText}>Повторить попытку</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={UsersStyles.safeArea}>
      <View style={UsersStyles.container}>
        <View style={UsersStyles.header}>
          <Text style={UsersStyles.title}>📰 Посты</Text>
          <Text style={UsersStyles.subtitle}>
            Публичные посты. Авторизованные пользователи видят свои черновики.
          </Text>
        </View>

        <View style={UsersStyles.controlsContainer}>
          <TextInput
            style={UsersStyles.searchInput}
            placeholder="Заголовок нового поста"
            placeholderTextColor="#C5C6C7"
            value={newTitle}
            onChangeText={setNewTitle}
          />
        </View>
        <View style={UsersStyles.controlsContainer}>
          <TextInput
            style={[UsersStyles.searchInput, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Содержимое нового поста"
            placeholderTextColor="#C5C6C7"
            value={newContent}
            onChangeText={setNewContent}
            multiline
          />
        </View>
        <View style={UsersStyles.controlsContainer}>
          <TouchableOpacity
            style={[
              UsersStyles.filterButton,
              { backgroundColor: publishNow ? '#66FCF1' : '#1F2833', borderWidth: 1, borderColor: '#66FCF1' },
            ]}
            onPress={() => setPublishNow(prev => !prev)}
            disabled={creating}
          >
            <Text
              style={[
                UsersStyles.filterButtonText,
                { color: publishNow ? '#0B0C10' : '#66FCF1' },
              ]}
            >
              {publishNow ? 'Опубликовать сразу' : 'Сохранить как черновик'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={UsersStyles.controlsContainer}>
          <TouchableOpacity
            style={[
              UsersStyles.filterButton,
              (!newTitle.trim() || !newContent.trim() || creating) && { opacity: 0.5 },
            ]}
            onPress={handleCreatePost}
            disabled={!newTitle.trim() || !newContent.trim() || creating}
          >
            {creating ? (
              <ActivityIndicator color="#0B0C10" />
            ) : (
              <Text style={UsersStyles.filterButtonText}>
                {publishNow ? 'Создать опубликованный пост' : 'Создать пост (черновик)'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={UsersStyles.controlsContainer}>
          <TextInput
            style={UsersStyles.searchInput}
            placeholder="Поиск по заголовку или содержимому..."
            placeholderTextColor="#C5C6C7"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => loadPosts(1, false)}
          />
          <TouchableOpacity
            style={UsersStyles.filterButton}
            onPress={() => loadPosts(1, false)}
          >
            <Text style={UsersStyles.filterButtonText}>Поиск</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#66FCF1']}
              tintColor="#66FCF1"
            />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={{ paddingVertical: 16 }}>
                <ActivityIndicator color="#66FCF1" />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={UsersStyles.emptyState}>
              <Text style={UsersStyles.emptyText}>
                {search ? 'Посты не найдены' : 'Пока нет постов'}
              </Text>
            </View>
          }
        />

        <View style={UsersStyles.navigationButtons}>
          <TouchableOpacity
            style={UsersStyles.navButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={UsersStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


