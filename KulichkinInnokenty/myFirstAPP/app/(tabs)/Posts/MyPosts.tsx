import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Container, Button, Card, H2, H3, Body, Caption } from '@/components/ui';
import { IconSymbol } from '@/components/ui/icon-symbol';
import usePostStore from '@/store/postStore';
import useAuthStore from '@/store/authStore';
import useThemeStore from '@/store/themeStore';
import { Post } from '@/types';

export default function MyPostsScreen() {
  const { colors } = useThemeStore();
  const { user, isAuthenticated } = useAuthStore();
  const { myPosts, createPost, updatePost, deletePost, isLoading } = usePostStore();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreatePost = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    try {
      await createPost({ title, description });
      setTitle('');
      setDescription('');
      setShowCreateForm(false);
      Alert.alert('Успех', 'Пост создан');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось создать пост');
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setShowCreateForm(false);
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    if (!title.trim() || !description.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    try {
      await updatePost(editingPost.id, { title, description });
      setTitle('');
      setDescription('');
      setEditingPost(null);
      Alert.alert('Успех', 'Пост обновлен');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось обновить пост');
    }
  };

  const handleDeletePost = (postId: string) => {
    Alert.alert(
      'Удаление поста',
      'Вы уверены, что хотите удалить этот пост?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePost(postId);
              Alert.alert('Успех', 'Пост удален');
            } catch (error) {
              Alert.alert('Ошибка', 'Не удалось удалить пост');
            }
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setTitle('');
    setDescription('');
  };

  if (!isAuthenticated) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <H2 style={{ color: colors.textPrimary }}>Требуется авторизация</H2>
          <Body style={{ color: colors.textSecondary, marginTop: 8 }}>
            Войдите в систему для создания постов
          </Body>
        </View>
      </Container>
    );
  }

  return (
    <Container scrollable>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <H2 style={{ color: colors.textPrimary }}>Мои посты</H2>
        <Button
          variant="primary"
          title={showCreateForm ? 'Отмена' : 'Создать пост'}
          onPress={() => setShowCreateForm(!showCreateForm)}
        />
      </View>

      {(showCreateForm || editingPost) && (
        <Card variant="outlined" style={styles.createForm}>
          <H3 style={{ color: colors.textPrimary, marginBottom: 16 }}>
            {editingPost ? 'Редактирование поста' : 'Новый пост'}
          </H3>

          <Body style={{ color: colors.textSecondary, marginBottom: 8 }}>
            Название
          </Body>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundElevated,
                color: colors.textPrimary,
                borderColor: colors.border,
              },
            ]}
            placeholder="Введите название..."
            placeholderTextColor={colors.textTertiary}
            value={title}
            onChangeText={setTitle}
          />

          <Body style={{ color: colors.textSecondary, marginBottom: 8, marginTop: 16 }}>
            Описание
          </Body>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: colors.backgroundElevated,
                color: colors.textPrimary,
                borderColor: colors.border,
              },
            ]}
            placeholder="Введите описание..."
            placeholderTextColor={colors.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <View style={styles.formButtons}>
            {editingPost && (
              <Button
                variant="outline"
                title="Отмена"
                onPress={handleCancelEdit}
                style={{ flex: 1 }}
              />
            )}
            <Button
              variant="primary"
              title={
                isLoading
                  ? editingPost
                    ? 'Сохранение...'
                    : 'Создание...'
                  : editingPost
                  ? 'Сохранить'
                  : 'Опубликовать'
              }
              onPress={editingPost ? handleUpdatePost : handleCreatePost}
              disabled={isLoading}
              style={{ flex: 1 }}
            />
          </View>
        </Card>
      )}

      <View style={styles.postsContainer}>
        {myPosts.length === 0 ? (
          <Card variant="outlined">
            <Body style={{ color: colors.textSecondary, textAlign: 'center' }}>
              У вас пока нет постов
            </Body>
          </Card>
        ) : (
          myPosts.map((post) => (
            <Card key={post.id} variant="outlined" style={styles.postCard}>
              <View style={styles.postHeader}>
                <H3 style={{ color: colors.textPrimary, flex: 1 }}>{post.title}</H3>
                <View style={styles.postActions}>
                  <TouchableOpacity onPress={() => handleEditPost(post)}>
                    <IconSymbol name="pencil" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                    <IconSymbol name="trash" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
              <Body style={{ color: colors.textSecondary, marginTop: 8 }}>
                {post.description}
              </Body>
              <Caption style={{ color: colors.textTertiary, marginTop: 12 }}>
                {new Date(post.createdAt).toLocaleString('ru-RU')}
              </Caption>
            </Card>
          ))
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createForm: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  postsContainer: {
    gap: 16,
  },
  postCard: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  postActions: {
    flexDirection: 'row',
    gap: 12,
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
});
