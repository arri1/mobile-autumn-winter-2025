import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Switch, Alert, ScrollView, Image, Modal } from 'react-native';
import { router } from 'expo-router';
import { getAccessToken, clearTokens } from '../api/authStore';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const API_URL = 'https://cloud.kit-imi.info/api';

export default function PostsScreen() {
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [useMyPosts, setUseMyPosts] = useState(true);
  const [authExpired, setAuthExpired] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);

  const token = getAccessToken();
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const ensureAuth = () => {
    if (!token) {
      Alert.alert('Не авторизован', 'Пожалуйста, войдите в аккаунт', [
        { text: 'Ок', onPress: () => router.replace('/(auth)/login') },
      ]);
      return false;
    }
    return true;
  };

  const loadPosts = async (targetPage = 1, modeMy = useMyPosts) => {
    if (!ensureAuth()) return;
    if (modeMy) {
      setAuthExpired(false);
    }
    setLoading(true);
    try {
      const path = modeMy ? '/posts/my' : '/posts';
      const url = `${API_URL}${path}?page=${targetPage}&limit=10`;
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.status === 401 && modeMy) {
        setAuthExpired(true);
        setPosts([]);
        setPagination(null);
        clearTokens();
        return;
      }
      if (!res.ok) {
        throw new Error(data?.message || 'Ошибка загрузки постов');
      }
      const postsData: Post[] = data?.data?.posts || data?.data?.items || [];
      const pag: Pagination | null = data?.data?.pagination || null;
      setPosts(postsData);
      setPagination(pag);
      setPage(targetPage);
    } catch (e: any) {
      Alert.alert('Ошибка', e.message || 'Не удалось загрузить посты');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(1, true);
  }, []);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPublished(false);
    setEditingId(null);
  };

  const handleCreateOrUpdate = async () => {
    if (!ensureAuth()) return;
    const titleClean = title.replace(/\s/g, '');
    const contentClean = content.replace(/\s/g, '');

    if (!titleClean || !contentClean) {
      Alert.alert('Ошибка', 'Заголовок и контент обязательны');
      return;
    }

    if (titleClean.length < 3) {
      Alert.alert('Ошибка', 'Заголовок должен содержать минимум 3 символа (без учёта пробелов)');
      return;
    }

    if (contentClean.length < 6) {
      Alert.alert('Ошибка', 'Текст поста должен содержать минимум 6 символов (без учёта пробелов)');
      return;
    }
    setCreating(true);
    try {
      const payload = { title: title.trim(), content: content.trim(), published };
      const isEdit = Boolean(editingId);
      const url = isEdit
        ? `${API_URL}/posts/${editingId}`
        : `${API_URL}/posts`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Ошибка сохранения поста');
      }
      resetForm();
      loadPosts(1, true);
    } catch (e: any) {
      Alert.alert('Ошибка', e.message || 'Не удалось сохранить пост');
    } finally {
      setCreating(false);
    }
  };

  const startEdit = (post: Post) => {
    if (!useMyPosts) return;
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
    setPublished(post.published);
  };

  const openPreview = (post: Post) => {
    setPreviewPost(post);
    setPreviewVisible(true);
  };

  const closePreview = () => {
    setPreviewVisible(false);
    setPreviewPost(null);
  };

  const handleDelete = async (id: string) => {
    if (!ensureAuth()) return;
    if (!useMyPosts) return; // нельзя удалять чужие посты
    Alert.alert('Удалить пост', 'Вы уверены, что хотите удалить пост?', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_URL}/posts/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await res.json().catch(() => null);
            if (!res.ok) {
              throw new Error(data?.message || 'Ошибка удаления поста');
            }
            if (editingId === id) {
              resetForm();
            }
            loadPosts(page, useMyPosts);
          } catch (e: any) {
            Alert.alert('Ошибка', e.message || 'Не удалось удалить пост');
          }
        },
      },
    ]);
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => {
        if (useMyPosts) {
          startEdit(item);
        } else {
          openPreview(item);
        }
      }}
      activeOpacity={0.7}
    >
      <View style={styles.postHeaderRow}>
        <Text style={styles.postTitle} numberOfLines={1}>
          {item.title}
        </Text>
        {useMyPosts && (
          <View style={[styles.statusBadge, item.published ? styles.statusPublished : styles.statusDraft]}>
            <Text style={styles.statusText}>{item.published ? 'Опубликован' : 'Черновик'}</Text>
          </View>
        )}
      </View>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.postFooterRow}>
        <Text style={styles.postDate}>
          {new Date(item.updatedAt || item.createdAt).toLocaleString()}
        </Text>
        {useMyPosts && (
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.deleteText}>Удалить</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bg}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/catalog')}>
          <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Посты</Text>
      </View>

      {useMyPosts && (
  <View style={styles.formContainer}>
    <Text style={styles.sectionTitle}>
      {editingId ? 'Редактирование поста' : 'Новый пост'}
    </Text>
    <TextInput
      style={styles.input}
      placeholder="Заголовок"
      placeholderTextColor="#B0B0B0"
      value={title}
      onChangeText={setTitle}
    />
    <TextInput
      style={[styles.input, styles.inputMultiline]}
      placeholder="Контент"
      placeholderTextColor="#B0B0B0"
      value={content}
      onChangeText={setContent}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
    />
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>Опубликовать</Text>
      <Switch
        value={published}
        onValueChange={setPublished}
        thumbColor={published ? '#93E1A1' : '#f4f3f4'}
        trackColor={{ false: '#767577', true: '#4CAF50' }}
      />
    </View>
    <View style={styles.formButtonsRow}>
      {editingId && (
        <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
          <Text style={styles.cancelButtonText}>Отмена</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleCreateOrUpdate}
        disabled={creating}
      >
        {creating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {editingId ? 'Сохранить' : 'Создать'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  </View>
)}

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, useMyPosts && styles.toggleButtonActive]}
          onPress={() => {
            setUseMyPosts(true);
            setAuthExpired(false);
            loadPosts(1, true);
          }}
        >
          <Text style={[styles.toggleText, useMyPosts && styles.toggleTextActive]}>
            Мои посты
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !useMyPosts && styles.toggleButtonActive]}
          onPress={() => {
            setUseMyPosts(false);
            setAuthExpired(false);
            loadPosts(1, false);
          }}
        >
          <Text style={[styles.toggleText, !useMyPosts && styles.toggleTextActive]}>
            Все посты
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {authExpired && useMyPosts
                ? 'Сессия истекла, авторизуйтесь ещё раз'
                : 'Постов пока нет'}
            </Text>
          }
        />
      )}

      {pagination && (
        <View style={styles.paginationRow}>
          <TouchableOpacity
            style={[styles.pageButton, !pagination.hasPrev && styles.pageButtonDisabled]}
            disabled={!pagination.hasPrev}
            onPress={() => loadPosts(page - 1)}
          >
            <Text style={styles.pageButtonText}>Назад</Text>
          </TouchableOpacity>
          <Text style={styles.pageInfo}>
            Стр. {pagination.currentPage} / {pagination.totalPages}
          </Text>
          <TouchableOpacity
            style={[styles.pageButton, !pagination.hasNext && styles.pageButtonDisabled]}
            disabled={!pagination.hasNext}
            onPress={() => loadPosts(page + 1)}
          >
            <Text style={styles.pageButtonText}>Вперёд</Text>
          </TouchableOpacity>
        </View>
      )}

      {previewPost && (
        <Modal
          visible={previewVisible}
          transparent
          animationType="fade"
          onRequestClose={closePreview}
        >
          <TouchableOpacity
            style={styles.previewOverlay}
            activeOpacity={1}
            onPress={closePreview}
          >
            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>{previewPost.title}</Text>
              <ScrollView style={styles.previewScroll}>
                <Text style={styles.previewContent}>{previewPost.content}</Text>
              </ScrollView>
              <Text style={styles.previewDate}>
                {new Date(previewPost.updatedAt || previewPost.createdAt).toLocaleString()}
              </Text>
              <TouchableOpacity style={styles.previewCloseButton} onPress={closePreview}>
                <Text style={styles.previewCloseText}>Закрыть</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#202130',
    paddingHorizontal: 12,
    paddingTop: 32,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#B0B0B0',
  },
  screenTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 40,
  },
  formContainer: {
    backgroundColor: '#1C1E27',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    maxHeight: 300,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#2E3140',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    fontSize: 14,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 14,
  },
  formButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
    paddingRight: 4,
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F09D9E',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#F09D9E',
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#5940C4',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#1C1E27',
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#2E3140',
  },
  toggleText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  emptyText: {
    color: '#B0B0B0',
    textAlign: 'center',
    marginTop: 20,
  },
  postCard: {
    backgroundColor: '#1C1E27',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#404459',
  },
  postHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  postTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusPublished: {
    backgroundColor: '#4CAF50',
  },
  statusDraft: {
    backgroundColor: '#757575',
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  postContent: {
    color: '#B0B0B0',
    fontSize: 13,
    marginBottom: 6,
  },
  postFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postDate: {
    color: '#777',
    fontSize: 11,
  },
  deleteText: {
    color: '#F09D9E',
    fontSize: 13,
    fontWeight: '600',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#2E3140',
  },
  pageButtonDisabled: {
    backgroundColor: '#2E3140aa',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 13,
  },
  pageInfo: {
    color: '#fff',
    fontSize: 13,
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  previewBox: {
    backgroundColor: '#1C1E27',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#404459',
  },
  previewTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  previewScroll: {
    marginBottom: 12,
  },
  previewContent: {
    color: '#B0B0B0',
    fontSize: 14,
    lineHeight: 20,
  },
  previewDate: {
    color: '#777',
    fontSize: 12,
    marginBottom: 10,
  },
  previewCloseButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#5940C4',
  },
  previewCloseText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});


