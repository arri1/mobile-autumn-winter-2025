import React, { useEffect, useState } from 'react';
import {  View,  Text,  SafeAreaView,  ScrollView,  ActivityIndicator,  TouchableOpacity,  Alert,} from 'react-native';
import { usePostsStore } from '../store/PostStore';
import { useAuthStore } from '../store/authStore';
import { styles } from '../styles/PostdetailStyles';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const { currentPost, isLoading, error, fetchPostById, deletePost } = usePostsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    await fetchPostById(postId);
  };

  const handleDelete = () => {
    Alert.alert(
      'Удалить пост?',
      'Вы уверены, что хотите удалить этот пост?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const result = await deletePost(postId);
            if (result.success) {
              navigation.goBack(); 
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditPost', { postId });
  };

  if (isLoading && !currentPost) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка поста...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={loadPost} style={styles.retryButton}>
          <Text style={styles.retryText}>Повторить</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!currentPost) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Пост не найден</Text>
      </SafeAreaView>
    );
  }

  const isOwner = user?.id === currentPost.author?.id;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{currentPost.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.author}>
            {currentPost.author?.name || 'Аноним'} •{' '}
            {new Date(currentPost.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
          {currentPost.updatedAt && currentPost.updatedAt !== currentPost.createdAt && (
            <Text style={styles.updated}>
              Обновлено: {new Date(currentPost.updatedAt).toLocaleDateString()}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        <Text style={styles.contentText}>{currentPost.content}</Text>

        {/* Кнопки действий (только для владельца) */}
        {isOwner && (
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={handleDelete}>
              <Text style={styles.actionText}>🗑 Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};



export default PostDetailScreen;