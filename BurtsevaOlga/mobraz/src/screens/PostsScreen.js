import React, { useEffect } from 'react';
import {View,Text, FlatList,TouchableOpacity,SafeAreaView,ActivityIndicator,RefreshControl,} from 'react-native';
import { usePostsStore } from '../store/PostStore';
import { styles } from '../styles/PostsStyles';

const PostsScreen = ({ navigation }) => {
  const { posts, isLoading, error, fetchPosts, clearError } = usePostsStore();

 

  const loadPosts = async () => {
    await fetchPosts();
  };
 
  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.postAuthor}>{item.author?.name || 'Аноним'}</Text>
        <Text style={styles.postDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Посты</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.createButtonText}>+ Новый пост</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyPosts')}>
          <Text style={styles.myPostsButton}>Мои посты</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={clearError}>
            <Text style={styles.retryText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLoading && posts.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadPosts} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>Пока нет постов</Text>
          }
        />
      )}
    </SafeAreaView>
  );
};



export default PostsScreen;