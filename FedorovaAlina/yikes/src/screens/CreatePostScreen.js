import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePostsStore } from '../store/postsStore';
import { useAuthStore } from '../store/authStore';
import { AppStyles } from '../styles/AppStyles';
import { CreatePostScreenStyles } from '../styles/CreatePostScreenStyles'; // Импортируем стили

export default function CreatePostScreen() {
  const { createPost, updatePost, isLoading, currentPost } = usePostsStore();
  const { user, activeScreen, setActiveScreen } = useAuthStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    if (currentPost) {
      setIsEditMode(true);
      setPostId(currentPost.id);
      setTitle(currentPost.title);
      setContent(currentPost.content);
      setPublished(currentPost.published);
    }
  }, [currentPost]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    const postData = {
      title: title.trim(),
      content: content.trim(),
      published,
    };

    if (isEditMode && postId) {
      const result = await updatePost(postId, postData);
      if (result) {
        Alert.alert('Успех', 'Пост успешно обновлен');
        setActiveScreen('posts');
      } else {
        Alert.alert('Ошибка', 'Не удалось обновить пост');
      }
    } else {
      const result = await createPost(postData);
      if (result) {
        Alert.alert('Успех', 'Пост успешно создан');
        setActiveScreen('posts');
      } else {
        Alert.alert('Ошибка', 'Не удалось создать пост');
      }
    }
  };

  const handleCancel = () => {
    if (title || content) {
      Alert.alert(
        'Отменить изменения?',
        'У вас есть несохраненные изменения. Вы уверены, что хотите отменить?',
        [
          { text: 'Нет', style: 'cancel' },
          { text: 'Да', onPress: () => setActiveScreen('posts') },
        ]
      );
    } else {
      setActiveScreen('posts');
    }
  };

  if (isLoading && isEditMode && !currentPost) {
    return (
      <View style={CreatePostScreenStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={CreatePostScreenStyles.safeArea}>
          <View style={CreatePostScreenStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#00d4ff" />
            <Text style={CreatePostScreenStyles.loadingText}>Загрузка поста...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={CreatePostScreenStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />
        <SafeAreaView style={CreatePostScreenStyles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={CreatePostScreenStyles.header}>
              <TouchableOpacity
                style={CreatePostScreenStyles.backButton}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={24} color="#00d4ff" />
              </TouchableOpacity>
              
              <View style={CreatePostScreenStyles.headerCenter}>
                <View style={CreatePostScreenStyles.titleBadge}>
                  <Text style={CreatePostScreenStyles.titleBadgeText}>
                    {isEditMode ? '⌗ РЕДАКТИРОВАТЬ ПОСТ' : '⌗ НОВЫЙ ПОСТ'}
                  </Text>
                </View>
                <Text style={CreatePostScreenStyles.headerSubtitle}>
                  {isEditMode ? 'РЕДАКТИРОВАНИЕ' : 'СОЗДАНИЕ'}
                </Text>
              </View>
              
              <View style={{ width: 40 }} />
            </View>

            {/* Разделительная линия */}
            <View style={CreatePostScreenStyles.cyberLine} />

            {/* Form */}
            <View style={CreatePostScreenStyles.formContainer}>
              {/* Title */}
              <View style={CreatePostScreenStyles.formGroup}>
                <Text style={CreatePostScreenStyles.label}>ЗАГОЛОВОК</Text>
                <TextInput
                  style={CreatePostScreenStyles.input}
                  placeholder="Введите заголовок..."
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  value={title}
                  onChangeText={setTitle}
                  maxLength={200}
                  editable={!isLoading}
                />
              </View>

              {/* Content */}
              <View style={CreatePostScreenStyles.formGroup}>
                <Text style={CreatePostScreenStyles.label}>СОДЕРЖАНИЕ</Text>
                <TextInput
                  style={[CreatePostScreenStyles.input, CreatePostScreenStyles.textArea]}
                  placeholder="Напишите содержание поста..."
                  placeholderTextColor="rgba(255, 255, 255, 0.3)"
                  value={content}
                  onChangeText={setContent}
                  multiline
                  numberOfLines={10}
                  editable={!isLoading}
                />
              </View>

              {/* Published Switch */}
              <View style={CreatePostScreenStyles.formGroup}>
                <Text style={CreatePostScreenStyles.label}>СТАТУС</Text>
                <View style={CreatePostScreenStyles.switchContainer}>
                  <Text style={CreatePostScreenStyles.switchLabel}>
                    {published ? 'Опубликован' : 'Черновик'}
                  </Text>
                  <Switch
                    value={published}
                    onValueChange={setPublished}
                    trackColor={{ false: '#2A2F3A', true: 'rgba(0, 212, 255, 0.3)' }}
                    thumbColor={published ? '#00d4ff' : '#9AA4B2'}
                    disabled={isLoading}
                  />
                </View>
              </View>

              {/* Buttons */}
              <View style={CreatePostScreenStyles.buttonGroup}>
                <TouchableOpacity
                  style={[
                    CreatePostScreenStyles.saveButton,
                    (!title.trim() || !content.trim() || isLoading) && CreatePostScreenStyles.saveButtonDisabled
                  ]}
                  onPress={handleSave}
                  disabled={!title.trim() || !content.trim() || isLoading}
                  activeOpacity={0.7}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#00d4ff" />
                  ) : (
                    <Text style={CreatePostScreenStyles.saveButtonText}>
                      {isEditMode ? 'ОБНОВИТЬ' : 'СОЗДАТЬ'}
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={CreatePostScreenStyles.cancelButton}
                  onPress={handleCancel}
                  disabled={isLoading}
                  activeOpacity={0.7}
                >
                  <Text style={CreatePostScreenStyles.cancelButtonText}>ОТМЕНА</Text>
                </TouchableOpacity>
              </View>

              {/* Author Info */}
              <View style={[CreatePostScreenStyles.formGroup, { marginTop: 30 }]}>
                <Text style={[CreatePostScreenStyles.label, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  АВТОР
                </Text>
                <View style={CreatePostScreenStyles.switchContainer}>
                  <Text style={[CreatePostScreenStyles.switchLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>
                    {user?.name || 'Пользователь'}
                  </Text>
                  <Ionicons name="person" size={20} color="rgba(0, 212, 255, 0.5)" />
                </View>
              </View>
            </View>

            {/* Пробел для нижней навигации */}
            <View style={AppStyles.bottomSpacer}></View>
          </ScrollView>
        </SafeAreaView>

        {/* Нижняя док-панель для навигации */}
        <View style={AppStyles.dockContainer}>
          <View style={AppStyles.dock}>
            {/* Главный экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('home')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="home" size={24} color={activeScreen === 'home' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'home' && AppStyles.dockTextActive]}>
                Home
              </Text>
            </TouchableOpacity>

            <View style={AppStyles.dockDivider}></View>

            {/* useState экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('usestate')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="git-branch" size={24} color={activeScreen === 'usestate' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'usestate' && AppStyles.dockTextActive]}>
                useState
              </Text>
            </TouchableOpacity>

            <View style={AppStyles.dockDivider}></View>

            {/* useEffect экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('useeffect')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="infinite" size={24} color={activeScreen === 'useeffect' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'useeffect' && AppStyles.dockTextActive]}>
                useEffect
              </Text>
            </TouchableOpacity>

            <View style={AppStyles.dockDivider}></View>

            {/* useMemo экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('usememo')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="flash" size={24} color={activeScreen === 'usememo' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'usememo' && AppStyles.dockTextActive]}>
                useMemo
              </Text>
            </TouchableOpacity>

            <View style={AppStyles.dockDivider}></View>

            {/* Посты экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('posts')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="document-text" size={24} color={activeScreen === 'posts' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'posts' && AppStyles.dockTextActive]}>
                Посты
              </Text>
            </TouchableOpacity>

            <View style={AppStyles.dockDivider}></View>

            {/* Profile экран */}
            <TouchableOpacity 
              style={AppStyles.dockItem}
              onPress={() => setActiveScreen('profile')}
              activeOpacity={0.7}
            >
              <View style={AppStyles.dockIcon}>
                <Ionicons name="person" size={24} color={activeScreen === 'profile' ? '#00d4ff' : '#ffffff'} />
              </View>
              <Text style={[AppStyles.dockText, activeScreen === 'profile' && AppStyles.dockTextActive]}>
                Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}