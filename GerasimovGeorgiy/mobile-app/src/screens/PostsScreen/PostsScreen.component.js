import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  View,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuthStore from '../../store/authStore';
import apiService from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Title,
  AddButton,
  AddButtonText,
  SearchFilterContainer,
  SearchInput,
  FilterContainer,
  FilterButton,
  FilterButtonText,
  PostCard,
  PostHeader,
  PostTitle,
  PostActions,
  ActionButton,
  PostContent,
  PostMeta,
  PostAuthor,
  PostDate,
  StatusBadge,
  StatusText,
  PaginationContainer,
  PaginationButton,
  PaginationButtonText,
  PageText,
  LoadingContainer,
  LoadingText,
  ErrorContainer,
  ErrorText,
  RetryButton,
  RetryButtonText,
  EmptyStateContainer,
  Emoji,
  EmptyStateText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalInput,
  ModalTextArea,
  ModalActions,
  ModalButton,
  ModalButtonText,
  CheckboxContainer,
  Checkbox,
  CheckboxLabel,
} from './PostsScreen.styles';

const PostsScreen = () => {
  const navigation = useNavigation();
  const currentUser = useAuthStore((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPublished, setFilterPublished] = useState(null); // null = all, true = published, false = draft
  const [showMyPosts, setShowMyPosts] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formPublished, setFormPublished] = useState(false);
  const limit = 10;

  const fetchPosts = useCallback(async (currentPage = 1, currentSearch = '', currentPublished = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = showMyPosts
        ? await apiService.getMyPosts({
            page: currentPage,
            limit,
            published: currentPublished !== null ? currentPublished : undefined,
          })
        : await apiService.getPosts({
            page: currentPage,
            limit,
            published: currentPublished !== null ? currentPublished : undefined,
            search: currentSearch,
          });
      
      if (response.success) {
        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.totalPages);
        setPage(response.data.pagination.currentPage);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch posts');
      Alert.alert('Ошибка', err.message || 'Не удалось загрузить список постов.');
    } finally {
      setIsLoading(false);
    }
  }, [showMyPosts]);

  useEffect(() => {
    fetchPosts(1, searchQuery, filterPublished);
  }, [fetchPosts, searchQuery, filterPublished, showMyPosts]);

  const handleRefresh = () => {
    fetchPosts(1, searchQuery, filterPublished);
  };

  const handleSearch = () => {
    fetchPosts(1, searchQuery, filterPublished);
  };

  const handleFilterChange = (published) => {
    setFilterPublished(published);
    fetchPosts(1, searchQuery, published);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormContent('');
    setFormPublished(false);
    setShowModal(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormContent(post.content);
    setFormPublished(post.published);
    setShowModal(true);
  };

  const handleDeletePost = async (postId) => {
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
              await apiService.deletePost(postId);
              Alert.alert('Успех', 'Пост успешно удален');
              fetchPosts(page, searchQuery, filterPublished);
            } catch (err) {
              Alert.alert('Ошибка', err.message || 'Не удалось удалить пост');
            }
          },
        },
      ]
    );
  };

  const handleSavePost = async () => {
    if (!formTitle.trim() || !formContent.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    try {
      if (editingPost) {
        await apiService.updatePost(editingPost.id, {
          title: formTitle,
          content: formContent,
          published: formPublished,
        });
        Alert.alert('Успех', 'Пост успешно обновлен');
      } else {
        await apiService.createPost({
          title: formTitle,
          content: formContent,
          published: formPublished,
        });
        Alert.alert('Успех', 'Пост успешно создан');
      }
      setShowModal(false);
      fetchPosts(page, searchQuery, filterPublished);
    } catch (err) {
      Alert.alert('Ошибка', err.message || 'Не удалось сохранить пост');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPostItem = ({ item }) => {
    const canEdit = currentUser && (currentUser.id === item.authorId || currentUser.role === 'ADMIN');
    
    return (
      <PostCard published={item.published}>
        <PostHeader>
          <PostTitle>{item.title}</PostTitle>
          {canEdit && (
            <PostActions>
              <ActionButton onPress={() => handleEditPost(item)}>
                <Ionicons name="create-outline" size={20} color="#5EEAD4" />
              </ActionButton>
              <ActionButton onPress={() => handleDeletePost(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </ActionButton>
            </PostActions>
          )}
        </PostHeader>
        <PostContent numberOfLines={3}>{item.content}</PostContent>
        <PostMeta>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PostAuthor>{item.author?.name || item.author?.email || 'Неизвестный автор'}</PostAuthor>
            <StatusBadge published={item.published}>
              <StatusText>{item.published ? 'Опубликовано' : 'Черновик'}</StatusText>
            </StatusBadge>
          </View>
          <PostDate>{formatDate(item.createdAt)}</PostDate>
        </PostMeta>
      </PostCard>
    );
  };

  const renderPagination = () => (
    <PaginationContainer>
      <PaginationButton onPress={() => fetchPosts(page - 1, searchQuery, filterPublished)} disabled={page === 1 || isLoading}>
        <PaginationButtonText disabled={page === 1 || isLoading}>Предыдущая</PaginationButtonText>
      </PaginationButton>
      <PageText>Страница {page} из {totalPages}</PageText>
      <PaginationButton onPress={() => fetchPosts(page + 1, searchQuery, filterPublished)} disabled={page === totalPages || isLoading}>
        <PaginationButtonText disabled={page === totalPages || isLoading}>Следующая</PaginationButtonText>
      </PaginationButton>
    </PaginationContainer>
  );

  if (isLoading && posts.length === 0) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#5EEAD4" />
        <LoadingText>Загрузка постов...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error && posts.length === 0) {
    return (
      <ErrorContainer>
        <ErrorText>{error}</ErrorText>
        <RetryButton onPress={handleRefresh}>
          <RetryButtonText>Повторить</RetryButtonText>
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Посты</Title>
        {currentUser && (
          <AddButton onPress={handleAddPost}>
            <Ionicons name="add" size={20} color="#0D0F14" />
            <AddButtonText>Создать</AddButtonText>
          </AddButton>
        )}
      </Header>

      <SearchFilterContainer>
        {!showMyPosts && (
          <SearchInput
            placeholder="Поиск по заголовку или содержимому"
            placeholderTextColor="#6b7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
        )}
        <FilterContainer>
          {currentUser && (
            <FilterButton active={showMyPosts} onPress={() => setShowMyPosts(!showMyPosts)}>
              <FilterButtonText active={showMyPosts}>Мои посты</FilterButtonText>
            </FilterButton>
          )}
          <FilterButton active={filterPublished === null} onPress={() => handleFilterChange(null)}>
            <FilterButtonText active={filterPublished === null}>Все</FilterButtonText>
          </FilterButton>
          <FilterButton active={filterPublished === true} onPress={() => handleFilterChange(true)}>
            <FilterButtonText active={filterPublished === true}>Опубликованные</FilterButtonText>
          </FilterButton>
          {showMyPosts && (
            <FilterButton active={filterPublished === false} onPress={() => handleFilterChange(false)}>
              <FilterButtonText active={filterPublished === false}>Черновики</FilterButtonText>
            </FilterButton>
          )}
        </FilterContainer>
      </SearchFilterContainer>

      {posts.length === 0 && !isLoading ? (
        <EmptyStateContainer>
          <Emoji>📝</Emoji>
          <EmptyStateText>Посты не найдены.</EmptyStateText>
        </EmptyStateContainer>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor="#5EEAD4"
            />
          }
          ListFooterComponent={totalPages > 1 ? renderPagination : null}
        />
      )}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>{editingPost ? 'Редактировать пост' : 'Создать пост'}</ModalTitle>
            <ModalInput
              placeholder="Заголовок"
              placeholderTextColor="#6b7280"
              value={formTitle}
              onChangeText={setFormTitle}
            />
            <ModalTextArea
              placeholder="Содержимое"
              placeholderTextColor="#6b7280"
              value={formContent}
              onChangeText={setFormContent}
              multiline
            />
            <CheckboxContainer>
              <Checkbox
                checked={formPublished}
                onPress={() => setFormPublished(!formPublished)}
              >
                {formPublished && <Ionicons name="checkmark" size={16} color="#0D0F14" />}
              </Checkbox>
              <CheckboxLabel>Опубликовать</CheckboxLabel>
            </CheckboxContainer>
            <ModalActions>
              <ModalButton onPress={() => setShowModal(false)}>
                <ModalButtonText>Отмена</ModalButtonText>
              </ModalButton>
              <ModalButton primary onPress={handleSavePost}>
                <ModalButtonText primary>Сохранить</ModalButtonText>
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default PostsScreen;

