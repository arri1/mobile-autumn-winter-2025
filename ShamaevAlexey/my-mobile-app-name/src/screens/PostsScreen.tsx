import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { usePostsStore, Post } from '../store/usePostsStore';
import { useAuthStore } from '../store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostsScreen() {
  const { posts, myPosts, isLoading, fetchPosts, fetchMyPosts, createPost, deletePost } = usePostsStore();
  const { currentUser } = useAuthStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'my'>('all');
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    if (filterMode === 'all') {
      fetchPosts();
    } else {
      fetchMyPosts();
    }
  }, [filterMode]);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Внимание', 'Заполните заголовок и текст');
      return;
    }
    const ok = await createPost(title, content);
    if (ok) {
      Alert.alert('Успех', 'Пост создан');
      setTitle('');
      setContent('');
    } else {
      Alert.alert('Ошибка', 'Не удалось создать пост');
    }
  };

  const handleDeleteSelected = () => {
    if (selectedPostIds.length === 0) return;
    Alert.alert(
      'Удалить посты',
      `Удалить выбранные (${selectedPostIds.length})?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            for (const id of selectedPostIds) {
              await deletePost(id);
            }
            setSelectedPostIds([]);
          },
        },
      ]
    );
  };

  const currentList = filterMode === 'all' ? posts : myPosts;
  const isMyPosts = filterMode === 'my';
  const showDeleteButton = isMyPosts && selectedPostIds.length > 0;

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.h2}>Новый пост</Text>
        <TextInput
          style={styles.input}
          placeholder="Заголовок"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Текст"
          multiline
          value={content}
          onChangeText={setContent}
        />
        <Button title="Добавить пост" onPress={handleCreate} color="#1976d2" />
      </View>

      <View style={{ marginBottom: 12 }}>
        <TextInput
          style={styles.input}
          placeholder="Поиск по ID"
          value={searchId}
          onChangeText={setSearchId}
        />
        <Button
          title="Поиск"
          onPress={async () => {
            const id = searchId.trim();
            if (!id) {
              Alert.alert('Внимание', 'Введите ID');
              return;
            }
            const token = await AsyncStorage.getItem('@accessToken');
            if (!token) return;
            const res = await fetch(`https://cloud.kit-imi.info/api/posts/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 404) {
              Alert.alert('Результат', 'Пост не найден');
              return;
            }
            const data = await res.json();
            if (res.ok && data.success) {
              usePostsStore.setState({ posts: [data.data.post || data.data] });
              setFilterMode('all');
              setSelectedPostIds([]);
            }
          }}
          color="#388e3c"
        />
      </View>

      <View style={{ gap: 8, marginBottom: 16 }}>
        <Button
          title={`Все посты (${posts.length})`}
          onPress={() => {
            setFilterMode('all');
            setSelectedPostIds([]);
          }}
          color="#1976d2"
        />
        <Button
          title={`Мои посты (${myPosts.length})`}
          onPress={() => {
            setFilterMode('my');
            setSelectedPostIds([]);
          }}
          color="#1976d2"
        />
        {showDeleteButton && (
          <Button
            title="Удалить выбранные"
            onPress={handleDeleteSelected}
            color="#d32f2f"
          />
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <Text style={styles.h2}>Список постов</Text>
        <Button
          title="Обновить"
          onPress={() => (filterMode === 'all' ? fetchPosts() : fetchMyPosts())}
          color="#1976d2"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 20 }} />
      ) : currentList.length === 0 ? (
        <Text style={{ textAlign: 'center', color: '#777', marginTop: 16 }}>
          {filterMode === 'all' ? 'Постов нет' : 'У вас нет постов'}
        </Text>
      ) : (
        currentList.map((post) => {
          const isOwn = post.author?.id === currentUser?.id;
          const selectable = isMyPosts && isOwn;
          const selected = selectable && selectedPostIds.includes(post.id);

          return (
            <View
              key={post.id}
              style={[
                styles.post,
                selectable && { borderColor: selected ? '#1976d2' : '#1976d2' },
                selected && { backgroundColor: '#e3f2fd' },
              ]}
              onTouchStart={() => {
                if (!selectable) return;
                setSelectedPostIds((prev) =>
                  prev.includes(post.id) ? prev.filter((id) => id !== post.id) : [...prev, post.id]
                );
              }}
            >
              <Text style={{ fontSize: 12, color: '#999' }}>ID: {post.id}</Text>
              <Text style={{ fontWeight: '600', fontSize: 16, marginVertical: 4 }}>{post.title}</Text>
              <Text style={{ color: '#444', marginBottom: 8 }}>{post.content}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {post.author && <Text style={{ fontSize: 13 }}>{post.author.name || post.author.email}</Text>}
                <Text style={{ fontSize: 13, color: '#999' }}>{formatDate(post.createdAt)}</Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  input: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  post: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  h2: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
});