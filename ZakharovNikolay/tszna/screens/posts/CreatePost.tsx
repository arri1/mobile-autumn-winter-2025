import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { usePostStore } from '../../store/postStore';
import { useAuthStore } from '../../store/authStore';

export default function CreatePostScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { createPost } = usePostStore();
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Проверяем авторизацию при монтировании компонента
    if (!isAuthenticated || !token) {
      Alert.alert(
        'Требуется авторизация',
        'Для создания поста необходимо войти в систему',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    }
  }, []);

  const handleCreate = async () => {
    // Дополнительная проверка перед созданием
    if (!isAuthenticated || !token) {
      Alert.alert('Ошибка', 'Требуется авторизация. Пожалуйста, войдите в систему.');
      navigation.goBack();
      return;
    }
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Введите заголовок поста');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Ошибка', 'Введите содержание поста');
      return;
    }

    setLoading(true);
    const { ok, error } = await createPost(title.trim(), content.trim());
    setLoading(false);

    if (ok) {
      Alert.alert('Успех', 'Пост успешно создан', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } else {
      Alert.alert('Ошибка', error || 'Не удалось создать пост');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Заголовок</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите заголовок поста"
          value={title}
          onChangeText={setTitle}
          maxLength={200}
        />

        <Text style={styles.label}>Содержание</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Введите содержание поста"
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.createButton, loading && styles.buttonDisabled]}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.createButtonText}>Создать</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 150,
    paddingTop: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  createButton: {
    backgroundColor: '#0000ff',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

