import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { AppStyles } from '../styles/AppStyles';
import { PostDetailScreenStyles } from '../styles/PostDetailScreenStyles'; // Импортируем стили

export default function PostDetailScreen() {
  const { getPostById, deletePost, currentPost, isLoading, error } = usePostsStore();
  const { user, activeScreen, setActiveScreen } = useAuthStore();
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (currentPost) {
      setPost(currentPost);
    } else {
      setActiveScreen('posts');
    }
  }, [currentPost, setActiveScreen]);

  const handleEdit = () => {
    if (post) {
      setActiveScreen('editPost');
    }
  };

  const handleDelete = () => {
    if (!post) return;
    
    Alert.alert(
      'Удалить пост',
      'Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        { 
          text: 'Удалить', 
          style: 'destructive',
          onPress: async () => {
            const result = await deletePost(post.id);
            if (result) {
              Alert.alert('Успех', 'Пост успешно удален');
              setActiveScreen('posts');
            }
          }
        },
      ]
    );
  };

  const handleShare = async () => {
    if (!post) return;
    
    try {
      await Share.share({
        message: `${post.title}\n\n${post.content.substring(0, 100)}...`,
        title: post.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRetry = () => {
    if (post?.id) {
      getPostById(post.id);
    }
  };

  const handleBack = () => {
    setActiveScreen('posts');
  };

  const isAuthor = post?.author?.id === user?.id;

  if (isLoading && !post) {
    return (
      <View style={PostDetailScreenStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={PostDetailScreenStyles.safeArea}>
          <View style={PostDetailScreenStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
            <Text style={PostDetailScreenStyles.loadingText}>Загрузка поста...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (error && !post) {
    return (
      <View style={PostDetailScreenStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={PostDetailScreenStyles.safeArea}>
          <View style={PostDetailScreenStyles.errorContainer}>
            <Ionicons name="warning" size={48} color="#ff2a6d" />
            <Text style={PostDetailScreenStyles.errorText}>{error}</Text>
            <TouchableOpacity
              style={PostDetailScreenStyles.retryButton}
              onPress={handleRetry}
              activeOpacity={0.7}
            >
              <Ionicons name="refresh" size={20} color="#00d4ff" />
              <Text style={PostDetailScreenStyles.retryButtonText}>ПОВТОРИТЬ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[PostDetailScreenStyles.retryButton, { marginTop: 12 }]}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="#00d4ff" />
              <Text style={PostDetailScreenStyles.retryButtonText}>ВЕРНУТЬСЯ К ПОСТАМ</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <View style={PostDetailScreenStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
      <SafeAreaView style={PostDetailScreenStyles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={PostDetailScreenStyles.header}>
            <TouchableOpacity
              style={PostDetailScreenStyles.backButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#00d4ff" />
            </TouchableOpacity>
            
            <View style={PostDetailScreenStyles.headerCenter}>
              <View style={PostDetailScreenStyles.titleBadge}>
                <Text style={PostDetailScreenStyles.titleBadgeText}>⌗ ПРОСМОТР ПОСТА</Text>
              </View>
              <Text style={PostDetailScreenStyles.headerSubtitle}>ДЕТАЛЬНАЯ ИНФОРМАЦИЯ</Text>
            </View>
            
            <View style={{ width: 40 }} />
          </View>

          {/* Разделительная линия */}
          <View style={PostDetailScreenStyles.cyberLine} />

          {/* Content */}
          <View style={PostDetailScreenStyles.contentContainer}>
            {/* Post Meta */}
            <View style={PostDetailScreenStyles.postMeta}>
              <View style={PostDetailScreenStyles.authorInfo}>
                <View style={PostDetailScreenStyles.authorAvatar}>
                  <Text style={PostDetailScreenStyles.authorAvatarText}>
                    {post.author?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={PostDetailScreenStyles.authorDetails}>
                  <Text style={PostDetailScreenStyles.authorName}>
                    {post.author?.name || 'Неизвестный автор'}
                  </Text>
                  <Text style={PostDetailScreenStyles.postDate}>
                    {new Date(post.createdAt).toLocaleDateString()} • {new Date(post.createdAt).toLocaleTimeString()}
                  </Text>
                </View>
              </View>
              
              <View style={[
                PostDetailScreenStyles.statusBadge,
                post.published ? PostDetailScreenStyles.statusPublished : PostDetailScreenStyles.statusDraft
              ]}>
                <Text style={[
                  PostDetailScreenStyles.statusText,
                  post.published ? PostDetailScreenStyles.publishedText : PostDetailScreenStyles.draftText
                ]}>
                  {post.published ? 'ОПУБЛИКОВАН' : 'ЧЕРНОВИК'}
                </Text>
              </View>
            </View>

            {/* Post Title */}
            <Text style={PostDetailScreenStyles.postTitle}>{post.title}</Text>

            {/* Post Content */}
            <Text style={PostDetailScreenStyles.postContent}>{post.content}</Text>

            {/* Action Buttons */}
            <View style={PostDetailScreenStyles.actionButtons}>
              <TouchableOpacity
                style={PostDetailScreenStyles.actionButton}
                onPress={handleShare}
                activeOpacity={0.7}
              >
                <Ionicons name="share" size={20} color="#00d4ff" />
                <Text style={PostDetailScreenStyles.actionButtonText}>ПОДЕЛИТЬСЯ</Text>
              </TouchableOpacity>
              
              {isAuthor && (
                <>
                  <TouchableOpacity
                    style={PostDetailScreenStyles.actionButton}
                    onPress={handleEdit}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="create" size={20} color="#00d4ff" />
                    <Text style={PostDetailScreenStyles.actionButtonText}>РЕДАКТИРОВАТЬ</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[PostDetailScreenStyles.actionButton, PostDetailScreenStyles.actionButtonDanger]}
                    onPress={handleDelete}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash" size={20} color="#ff2a6d" />
                    <Text style={[PostDetailScreenStyles.actionButtonText, PostDetailScreenStyles.actionButtonTextDanger]}>
                      УДАЛИТЬ
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

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