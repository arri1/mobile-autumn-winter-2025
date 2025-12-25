import React, { useState, useEffect } from 'react';
import { 
  View, Text, Button, Alert, TextInput, FlatList, 
  Modal 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://cloud.kit-imi.info/api';

type Author = {
  id: string;
  name: string;
  email: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: Author;
  createdAt: string;
};

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [myId, setMyId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const getMyId = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setMyId(data.data?.user?.id || '');
    } catch {}
  };
  const loadPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/posts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setPosts(data.data?.posts || []);
    } catch {
      Alert.alert('Ошибка', 'Не загрузились посты');
    }
  };
  useEffect(() => {
    loadPosts();
    getMyId();
  }, []);
  const createPost = async () => {
    if (!newTitle || !newContent) {
      Alert.alert('Ошибка', 'Заполни поля');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
          published: true
        })
      });
      if (res.ok) {
        Alert.alert('Успех', 'Пост создан');
        setNewTitle('');
        setNewContent('');
        loadPosts();
      }
    } catch {
      Alert.alert('Ошибка', 'Не создался пост');
    }
  };
  const deletePost = async (id: string, authorId: string) => {
    if (authorId !== myId) {
      Alert.alert('Ошибка', 'Можно удалять только свои посты');
      return;
    }
    Alert.alert(
      'Удалить пост?',
      'Вы уверены?',
      [
        { text: 'Нет' },
        {
          text: 'Да',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('authToken');
              const res = await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
              });
              if (res.ok) {
                Alert.alert('Успех', 'Пост удален');
                loadPosts();
              }
            } catch {
              Alert.alert('Ошибка', 'Не удалился');
            }
          }
        }
      ]
    );
  };
  const openEdit = (post: Post) => {
    if (post.authorId !== myId) {
      Alert.alert('Ошибка', 'Можно редактировать только свои посты');
      return;
    }
    setEditingPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditModal(true);
  };
  const saveEdit = async () => {
    if (!editTitle || !editContent || !editingPost) return;
    try {
      const token = await AsyncStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          published: editingPost.published
        })
      });

      if (res.ok) {
        Alert.alert('Успех', 'Пост обновлен');
        setEditModal(false);
        loadPosts();
      }
    } catch {
      Alert.alert('Ошибка', 'Не обновился');
    }
  };
  return (
    <View style={{ padding: 20 }}>
      {}
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Создать пост:</Text>
      <TextInput
        placeholder="Заголовок"
        value={newTitle}
        onChangeText={setNewTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Содержание"
        value={newContent}
        onChangeText={setNewContent}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, height: 80 }}
        multiline
      />
      <Button title="Создать пост" onPress={createPost} />
      {}
      <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10 }}>
        Все посты ({posts.length}):
      </Text>
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item.id}
        renderItem={({ item }: { item: Post }) => (
          <View style={{ 
            borderWidth: 1, 
            padding: 10, 
            marginBottom: 10,
            backgroundColor: item.authorId === myId ? '#f0f8ff' : '#fff'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
            <Text style={{ marginVertical: 5 }}>{item.content}</Text>
            <Text style={{ color: '#666', fontSize: 12 }}>
              Автор: {item.author?.name || 'Неизвестно'} • 
              Статус: {item.published ? 'Опубликован' : 'Черновик'} • 
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            {}
            {item.authorId === myId && (
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button 
                  title="Редактировать" 
                  onPress={() => openEdit(item)} 
                />
                <View style={{ width: 10 }} />
                <Button 
                  title="Удалить" 
                  onPress={() => deletePost(item.id, item.authorId)} 
                  color="red" 
                />
              </View>
            )}
          </View>
        )}
      />
      {}
      <Modal
        visible={editModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModal(false)}
      >
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 20 
        }}>
          <View style={{ 
            backgroundColor: 'white', 
            padding: 20, 
            borderRadius: 10,
            width: '100%' 
          }}>
            <Text style={{ fontSize: 18, marginBottom: 15 }}>Редактировать пост</Text>
            
            <TextInput
              placeholder="Заголовок"
              value={editTitle}
              onChangeText={setEditTitle}
              style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
            />
            
            <TextInput
              placeholder="Содержание"
              value={editContent}
              onChangeText={setEditContent}
              style={{ borderWidth: 1, padding: 8, marginBottom: 15, height: 100 }}
              multiline
            />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Отмена" onPress={() => setEditModal(false)} />
              <Button title="Сохранить" onPress={saveEdit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}