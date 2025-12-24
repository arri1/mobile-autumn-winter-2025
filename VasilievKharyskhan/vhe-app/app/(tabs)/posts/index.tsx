import React, { useEffect, useState } from 'react';
import {
  View, FlatList, ActivityIndicator,
  TouchableOpacity, RefreshControl, Modal, TextInput, Alert,
  SafeAreaView, Text
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 

import usePostStore from '@/store/postStore';
import useAuthStore from '@/store/authStore';
import { styles } from "./_styles";

// Хук для цветов
import { useThemeColor } from '@/hooks/use-theme-color';

export default function PostsScreen() {
  // --- ЯВНАЯ НАСТРОЙКА ЦВЕТОВ ---
  const screenBg = useThemeColor({ light: '#F2F2F7', dark: '#000000' }, 'background');
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'card');
  const textColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' }, 'text');
  const subTextColor = useThemeColor({ light: '#8E8E93', dark: '#9BA1A6' }, 'icon');
  const inputBg = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'input');
  
  // Цвета для табов
  const activeTabColor = '#007AFF';
  const inactiveTabColor = subTextColor;

  const { 
    posts, viewMode, setViewMode, fetchPosts, 
    createPost, updatePost, deletePost,
    pagination, isLoading, isRefreshing, isLoadingMore 
  } = usePostStore();

  const { user: currentUser } = useAuthStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const handleRefresh = () => fetchPosts(true);
  const handleLoadMore = () => {
    if (pagination.hasNext && !isLoadingMore) fetchPosts(false);
  };

  // --- Modal Logic ---
  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setTitle('');
    setContent('');
    setModalVisible(true);
  };

  const openEditModal = (post) => {
    setIsEditing(true);
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Валидация', 'Заполните все поля');
      return;
    }
    try {
      if (isEditing) {
        await updatePost(editingId, { title, content, published: true });
        Alert.alert("Успех", "Пост обновлен");
      } else {
        await createPost({ title, content, published: true });
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Ошибка', error.message);
    }
  };

  const handleDeletePress = (id) => {
    Alert.alert("Удаление", "Удалить этот пост?", [
      { text: "Отмена", style: "cancel" },
      { text: "Удалить", style: "destructive", onPress: () => deletePost(id).catch(e => Alert.alert('Ошибка', e.message)) }
    ]);
  };

  // --- Рендер карточки ---
  const renderItem = ({ item }) => {
    const isOwner = currentUser?.id?.toString() === item.author?.id?.toString();

    return (
      // Применяем cardBg явно
      <View style={[styles.card, { backgroundColor: cardBg }]}>
        <View style={styles.cardHeader}>
          <View style={styles.authorRow}>
            {/* Аватар */}
            <View style={[styles.avatar, { backgroundColor: inputBg }]}>
              <Text style={[styles.avatarText, { color: subTextColor }]}>
                {item.author?.name?.[0]?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View>
              {/* Имя и Дата */}
              <Text style={[styles.authorName, { color: textColor }]}>
                {item.author?.name || 'Unknown'}
              </Text>
              <Text style={[styles.date, { color: subTextColor }]}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          {isOwner && (
            <View style={styles.actionsRow}>
              <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionBtn}>
                <Ionicons name="pencil" size={18} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeletePress(item.id)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={18} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Контент с явным цветом текста */}
        <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
        <Text style={[styles.content, { color: textColor }]} numberOfLines={4}>
            {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: screenBg }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: cardBg, borderBottomColor: inputBg }]}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Лента</Text>
        <TouchableOpacity onPress={openCreateModal}>
          <MaterialIcons name="post-add" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: cardBg }]}>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'all' && styles.activeTab]} 
          onPress={() => setViewMode('all')}
        >
          <Text style={[
              styles.tabText, 
              { color: viewMode === 'all' ? activeTabColor : inactiveTabColor }
          ]}>Все посты</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'my' && styles.activeTab]} 
          onPress={() => setViewMode('my')}
        >
          <Text style={[
              styles.tabText,
              { color: viewMode === 'my' ? activeTabColor : inactiveTabColor }
          ]}>Мои посты</Text>
        </TouchableOpacity>
      </View>

      {/* Список */}
      {isLoading && posts.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.centerLoader} />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor={textColor} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: subTextColor }]}>Нет постов</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: cardBg }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: textColor }]}>
                {isEditing ? 'Редактировать' : 'Новый пост'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={subTextColor} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Заголовок"
              placeholderTextColor={subTextColor}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea, { backgroundColor: inputBg, color: textColor }]}
              placeholder="Текст поста..."
              placeholderTextColor={subTextColor}
              value={content}
              onChangeText={setContent}
              multiline
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitBtnText}>
                  {isEditing ? 'Сохранить' : 'Опубликовать'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};