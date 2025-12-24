import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
  TouchableOpacity, RefreshControl, Modal, TextInput, Alert,
  Platform, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'; 
import usePostStore from '@/store/postStore';
import useAuthStore from '@/store/authStore';
import { styles } from "./_styles";

export default function PostsScreen() {
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

  const renderItem = ({ item }) => {
    const isOwner = currentUser?.id?.toString() === item.author?.id?.toString();

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.authorRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.author?.name?.[0]?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View>
              <Text style={styles.authorName}>{item.author?.name || 'Unknown'}</Text>
              <Text style={styles.date}>
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

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content} numberOfLines={4}>{item.content}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Лента</Text>
        <TouchableOpacity onPress={openCreateModal}>
          <MaterialIcons name="post-add" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'all' && styles.activeTab]} 
          onPress={() => setViewMode('all')}
        >
          <Text style={[styles.tabText, viewMode === 'all' && styles.activeTabText]}>Все посты</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'my' && styles.activeTab]} 
          onPress={() => setViewMode('my')}
        >
          <Text style={[styles.tabText, viewMode === 'my' && styles.activeTabText]}>Мои посты</Text>
        </TouchableOpacity>
      </View>

      {isLoading && posts.length === 0 ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.centerLoader} />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={<Text style={styles.emptyText}>Нет постов</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Редактировать пост' : 'Новый пост'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Заголовок"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Текст поста..."
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
    </SafeAreaView>
  );
};
