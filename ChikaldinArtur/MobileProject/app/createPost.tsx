import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { createPost } from './apiPosts/posts';

export default function CreatePostScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Введите заголовок поста');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Ошибка', 'Введите содержимое поста');
      return;
    }

    setLoading(true);
    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
        published,
      });

      Alert.alert('Успех', 'Пост успешно создан!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      console.error('Create post error:', error);
      Alert.alert(
        'Ошибка',
        error.response?.data?.message || 'Не удалось создать пост'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}>
          Новый пост
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
          placeholder="Введите заголовок..."
          value={title}
          onChangeText={setTitle}
          editable={!loading}
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
          placeholder="Напишите текст поста..."
          value={content}
          onChangeText={setContent}
          multiline
          editable={!loading}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 16 }}>Опубликовать сразу</Text>
          <Switch value={published} onValueChange={setPublished} disabled={loading} />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: loading ? '#aaa' : '#007AFF',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {loading ? 'Создание...' : 'Создать пост'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 12, alignItems: 'center' }}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={{ color: '#666', fontSize: 16 }}>Отмена</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}