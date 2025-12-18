import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Switch,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useAppStore } from '../store/useAppStore';
import { createPostsStyles } from '../styles/postsStyles';
import { darkThemeStyles, lightThemeStyles } from '../styles/appStyles';
import { Post, CreatePostData, UpdatePostData } from '../service/api';

interface PostModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: CreatePostData | UpdatePostData) => Promise<void>;
    initialData?: Post | null;
    isLoading?: boolean;
    isEdit?: boolean;
}

const PostModal: React.FC<PostModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialData,
    isLoading = false,
    isEdit = false,
}) => {
    const { theme } = useAppStore();
    const styles = createPostsStyles(theme);
    const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(true);

  // Инициализация формы при открытии
    useEffect(() => {
    if (visible) {
        if (isEdit && initialData) {
        setTitle(initialData.title || '');
        setContent(initialData.content || '');
        setPublished(initialData.published ?? true);
        } else {
        setTitle('');
        setContent('');
        setPublished(true);
        }
    }
    }, [visible, isEdit, initialData]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Ошибка', 'Введите заголовок поста');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Ошибка', 'Введите содержание поста');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        published,
      });
      
      // Сброс формы после успешного сохранения
      if (!isEdit) {
        setTitle('');
        setContent('');
        setPublished(true);
      }
      
      onClose();
    } catch (error) {
      // Ошибка обрабатывается в родительском компоненте
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[
          { flex: 1, backgroundColor: themeStyles.background },
          Platform.OS === 'ios' && { paddingTop: 60 },
        ]}
      >
        <View style={[
          styles.header,
          { borderBottomWidth: 0, paddingTop: Platform.OS === 'ios' ? 0 : 16 }
        ]}>
          <TouchableOpacity onPress={handleClose} disabled={isLoading}>
            <Text style={[styles.actionText, { color: themeStyles.primary }]}>
              Отмена
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>
            {isEdit ? 'Редактировать пост' : 'Новый пост'}
          </Text>
          
          <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color={themeStyles.primary} size="small" />
            ) : (
              <Text style={[styles.actionText, { color: themeStyles.primary }]}>
                Сохранить
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: 16 }}>
            {/* Заголовок */}
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.authorName, { marginBottom: 8 }]}>
                Заголовок
              </Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Введите заголовок..."
                placeholderTextColor={themeStyles.secondary}
                style={{
                  borderWidth: 1,
                  borderColor: themeStyles.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 16,
                  color: themeStyles.text,
                  backgroundColor: themeStyles.card,
                }}
                editable={!isLoading}
                maxLength={200}
              />
            </View>

            {/* Содержание */}
            <View style={{ marginBottom: 20 }}>
              <Text style={[styles.authorName, { marginBottom: 8 }]}>
                Содержание
              </Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Напишите содержание поста..."
                placeholderTextColor={themeStyles.secondary}
                style={{
                  borderWidth: 1,
                  borderColor: themeStyles.border,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: themeStyles.text,
                  backgroundColor: themeStyles.card,
                  minHeight: 150,
                  textAlignVertical: 'top',
                }}
                multiline
                numberOfLines={8}
                editable={!isLoading}
                maxLength={5000}
              />
            </View>

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              backgroundColor: themeStyles.card,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: themeStyles.border,
            }}>
              <View>
                <Text style={{ fontSize: 14, fontWeight: '500', color: themeStyles.text }}>
                  Опубликовать
                </Text>
                <Text style={{ fontSize: 12, color: themeStyles.secondary, marginTop: 2 }}>
                  {published ? 'Пост будет виден всем' : 'Пост будет сохранен как черновик'}
                </Text>
              </View>
              
              <Switch
                value={published}
                onValueChange={setPublished}
                disabled={isLoading}
                trackColor={{ false: '#9ca3af', true: themeStyles.primary }}
                thumbColor={published ? '#fff' : '#fff'}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PostModal;