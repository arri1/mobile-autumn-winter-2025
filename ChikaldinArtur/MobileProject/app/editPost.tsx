// app/editPost.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { fetchPostById, updatePost, deletePost } from './apiPosts/posts';

export default function EditPostScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!id) {
        Alert.alert('Ошибка', 'ID поста не передан');
        router.back();
        return;
      }

      try {
        const post = await fetchPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setPublished(post.published);
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось загрузить пост');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Ошибка', 'Заголовок и содержимое не могут быть пустыми');
      return;
    }

    setSaving(true);
    try {
      await updatePost(id, {
        title: title.trim(),
        content: content.trim(),
        published,
      });

      Alert.alert('Успех', 'Пост обновлён', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Ошибка',
        error.response?.data?.message || 'Не удалось сохранить изменения'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Удалить пост?', 'Это действие нельзя отменить', [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(id);
            Alert.alert('Удалено', 'Пост удалён', [
              { text: 'OK', onPress: () => router.back() },
            ]);
          } catch (error) {
            Alert.alert('Ошибка', 'Не удалось удалить пост');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Редактировать пост
        </Text>

        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>
          Заголовок
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            marginBottom: 20,
          }}
          value={title}
          onChangeText={setTitle}
          editable={!saving}
        />

        <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600' }}>
          Содержимое
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            minHeight: 200,
            textAlignVertical: 'top',
            marginBottom: 20,
          }}
          value={content}
          onChangeText={setContent}
          multiline
          editable={!saving}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 16 }}>Опубликован</Text>
          <Switch value={published} onValueChange={setPublished} disabled={saving} />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: saving ? '#aaa' : '#007AFF',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 12,
          }}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {saving ? 'Сохранение...' : 'Сохранить'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#FF3B30',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 20,
          }}
          onPress={handleDelete}
          disabled={saving}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Удалить пост
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => router.back()}
          disabled={saving}
        >
          <Text style={{ color: '#666', fontSize: 16 }}>Отмена</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}