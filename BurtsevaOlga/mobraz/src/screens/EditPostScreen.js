import React, { useEffect, useState } from 'react';
import {View, Text,  TextInput,  TouchableOpacity,  SafeAreaView,  ScrollView,  ActivityIndicator,  Alert,} from 'react-native';
import { usePostsStore } from '../store/PostStore';
import { styles } from '../styles/EditPostStyles';

const EditPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const {
    currentPost,
    isLoading,
    error,
    fetchPostById,
    updatePost,
    clearError,
  } = usePostsStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Загружаем пост при монтировании
  useEffect(() => {
    const load = async () => {
      await fetchPostById(postId);
    };
    load();
  }, [postId]);

  // Заполняем форму, когда пост загружен
  useEffect(() => {
    if (currentPost && currentPost.id === postId) {
      setTitle(currentPost.title || '');
      setContent(currentPost.content || '');
    }
  }, [currentPost, postId]);

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Заголовок обязателен');
      return;
    }
    if (!content.trim()) {
      Alert.alert('Ошибка', 'Содержание обязательно');
      return;
    }

    const result = await updatePost(postId, { title, content });
    if (result.success) {
      Alert.alert('Успех', 'Пост обновлён');
      navigation.goBack();
    }
  };

  // Если пост ещё не загружен — показываем лоадер
  if (!currentPost || currentPost.id !== postId) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Загрузка поста...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Редактирование поста</Text>

        <Text style={styles.label}>Заголовок</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Введите заголовок"
          maxLength={100}
        />

        <Text style={styles.label}>Содержание</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={content}
          onChangeText={setContent}
          placeholder="Напишите содержание..."
          multiline
          textAlignVertical="top"
          numberOfLines={10}
        />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleUpdate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Сохранить изменения</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Отмена</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPostScreen;