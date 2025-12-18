// screens/MyPostsScreen.js
import React, { useEffect } from 'react';
import {  View, Text,  FlatList,  TouchableOpacity,  SafeAreaView,  ActivityIndicator,  RefreshControl,  } from 'react-native';
import { usePostsStore } from '../store/PostStore';
import { styles } from '../styles/MyPostsStyles';

const MyPostsScreen = ({ navigation }) => {
  const { myPosts, isLoading, error, fetchMyPosts, clearError } = usePostsStore();

  useEffect(() => {
  console.log('📥 MyPostsScreen mounted. Current myPosts length:', myPosts.length);
  loadMyPosts();
}, []);

const loadMyPosts = async () => {
  console.log('🔁 Запуск fetchMyPosts...');
  const result = await fetchMyPosts();
  console.log('✅ fetchMyPosts result:', result);
};

  const renderMyPost = ({ item }) => (
    <View style={styles.postCard}>
      <TouchableOpacity
        style={styles.postTouchable}
        onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      >
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.postDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мои посты</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => {
            clearError();
            loadMyPosts();
          }}>
            <Text style={styles.retryText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading && myPosts.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={myPosts}
          renderItem={renderMyPost}
          keyExtractor={item => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadMyPosts} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>У вас пока нет постов</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};


export default MyPostsScreen;