import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import usePostsStore from '../../store/usePostsStore';
import useAuthStore from '../../store/authStore';

export default function PostsScreen() {
  const { 
    posts, 
    myPosts, 
    isLoading, 
    fetchPosts, 
    fetchMyPosts, 
    createPost, 
    updatePost,
    deletePost 
  } = usePostsStore();
  
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingPost, setEditingPost] = useState(null);
  
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    published: true
  });

  useEffect(() => {
    loadPosts();
  }, [activeTab]);

  const loadPosts = async () => {
    setRefreshing(true);
    if (activeTab === 'all') {
      await fetchPosts();
    } else {
      await fetchMyPosts();
    }
    setRefreshing(false);
  };

  const openCreateModal = () => {
    setModalMode('create');
    setPostData({ title: '', content: '', published: true });
    setEditingPost(null);
    setShowModal(true);
  };

  const openEditModal = (post) => {
    setModalMode('edit');
    setPostData({
      title: post.title,
      content: post.content,
      published: post.published
    });
    setEditingPost(post);
    setShowModal(true);
  };

  const handleSavePost = async () => {
    if (!postData.title.trim() || !postData.content.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    try {
      if (modalMode === 'create') {
        await createPost(postData);
        Alert.alert('Успех', 'Пост создан');
      } else if (modalMode === 'edit' && editingPost) {
        await updatePost(editingPost.id, postData);
        Alert.alert('Успех', 'Пост обновлен');
      }
      
      setShowModal(false);
      loadPosts();
    } catch (error) {
      Alert.alert('Ошибка', error.message || 'Не удалось сохранить пост');
    }
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      'Удалить пост',
      'Вы уверены, что хотите удалить этот пост?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            const result = await deletePost(postId);
            if (result.success) {
              loadPosts();
            }
          },
        },
      ]
    );
  };

  const renderPostItem = ({ item }) => {
    const isAuthor = user?.id === item.author?.id;
    
    return (
      <View style={[styles.postCard, !item.published && styles.unpublishedCard]}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={3}>
          {item.content}
        </Text>
        <View style={styles.postFooter}>
          <Text style={styles.postAuthor}>
            {item.author?.name || 'Неизвестный автор'}
          </Text>
          <Text style={styles.postDate}>
            {new Date(item.createdAt).toLocaleDateString()}
            {!item.published && ' • Черновик'}
          </Text>
        </View>
        
        {isAuthor && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => openEditModal(item)}
            >
              <Text style={styles.editButtonText}>Изменить</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeletePost(item.id)}
            >
              <Text style={styles.deleteButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const currentData = activeTab === 'all' ? posts : myPosts;

  return (
    <View style={styles.container}>
      {/* Вкладки */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Все посты ({posts.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'my' && styles.activeTab]}
          onPress={() => setActiveTab('my')}
        >
          <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
            Мои посты ({myPosts.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка создания */}
      <TouchableOpacity style={styles.createButton} onPress={openCreateModal}>
        <Text style={styles.createButtonText}>+ Создать пост</Text>
      </TouchableOpacity>

      {/* Список */}
      <FlatList
        data={currentData}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadPosts} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {activeTab === 'all' ? 'Нет постов' : 'У вас еще нет постов'}
            </Text>
          </View>
        }
      />

      {/* Модальное окно */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalMode === 'create' ? 'Новый пост' : 'Редактировать пост'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Заголовок"
              value={postData.title}
              onChangeText={(text) => setPostData({...postData, title: text})}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Содержание"
              value={postData.content}
              onChangeText={(text) => setPostData({...postData, content: text})}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Опубликовать:</Text>
              <Switch
                value={postData.published}
                onValueChange={(value) => setPostData({...postData, published: value})}
              />
              <Text style={styles.switchText}>
                {postData.published ? 'Да' : 'Нет'}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSavePost}
              >
                <Text style={styles.saveButtonText}>
                  {modalMode === 'create' ? 'Создать' : 'Сохранить'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0c10',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#0D0F14',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#5EEAD4',
  },
  tabText: {
    color: '#9AA4B2',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#052925',
  },
  createButton: {
    backgroundColor: '#5EEAD4',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#052925',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postCard: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1C2230',
  },
  unpublishedCard: {
    borderColor: '#7a5a1f',
    opacity: 0.8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E6E9EF',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#9AA4B2',
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postAuthor: {
    fontSize: 12,
    color: '#5EEAD4',
  },
  postDate: {
    fontSize: 12,
    color: '#9AA4B2',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#0e2f25',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#5EEAD4',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#2d1a1a',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#9AA4B2',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E6E9EF',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#0f1218',
    borderWidth: 1,
    borderColor: '#1C2230',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#E6E9EF',
    marginBottom: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: '#B3B8C3',
    marginRight: 12,
    flex: 1,
  },
  switchText: {
    fontSize: 14,
    color: '#9AA4B2',
    marginLeft: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2A2F3A',
  },
  cancelButtonText: {
    color: '#9AA4B2',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#5EEAD4',
  },
  saveButtonText: {
    color: '#052925',
    fontWeight: 'bold',
  },
});