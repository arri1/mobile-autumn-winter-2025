import { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import { fetchPosts } from '../apiPosts/posts';
import { Post } from '../apiPosts/posts';
import { router } from 'expo-router';

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    setLoading(true);
    try {
      const data = await fetchPosts(pageNum);
      if (isRefresh) {
        setPosts(data.posts);
      } else {
        setPosts(prev => [...prev, ...data.posts]);
      }
      setHasMore(data.pagination.hasNext);
      setPage(pageNum);
    } catch (err) {
      alert('Ошибка загрузки постов');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts(1, true);
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }} onPress={() => router.push(`/post/${item.id}`)}>
            {item.title}
          </Text>
          <Text numberOfLines={2}>{item.content}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            {item.author.name || item.author.email}
          </Text>
        </View>
      )}
      onEndReached={() => hasMore && !loading && loadPosts(page + 1)}
      onEndReachedThreshold={0.5}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadPosts(1, true)} />}
      ListFooterComponent={loading && <ActivityIndicator />}
    />
  );
}