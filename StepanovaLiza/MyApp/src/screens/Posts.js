import React, { useEffect, useState } from 'react';
import { FlatList, Alert, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import useAuthStore from '../store/authStore';

const API = 'https://cloud.kit-imi.info/api';

export default function PostsScreen() {
  const { authFetch, isAuthenticated, user } = useAuthStore();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('all'); 

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);


  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/posts`);
      const json = await res.json();
      setPosts(json.data.posts);
    } catch {
      Alert.alert('Ошибка', 'Не удалось загрузить посты');
    } finally {
      setLoading(false);
    }
  };


  const loadMyPosts = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`${API}/posts/my`);
      const json = await res.json();
      setPosts(json.data.posts);
    } catch {
      Alert.alert('Ошибка', 'Не удалось загрузить мои посты');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'all') {
      loadPosts();
    }
    if (activeTab === 'my' && isAuthenticated) {
      loadMyPosts();
    }
  }, [activeTab, isAuthenticated]);


  const createPost = async () => {
      try {
      const res = await authFetch(`${API}/posts`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          published: true,
        }),
      });

      if (res.ok) {
        setTitle('');
        setContent('');
        activeTab === 'all' ? loadPosts() : loadMyPosts();
      }
    } catch {
      Alert.alert('Ошибка', 'Не удалось создать пост');
    }
  };


  const updatePost = async () => {
    try {
      const res = await authFetch(`${API}/posts/${editingPost.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
          published: editingPost.published,
        }),
      });

      if (res.ok) {
        setEditingPost(null);
        setTitle('');
        setContent('');
        activeTab === 'all' ? loadPosts() : loadMyPosts();
      }
    } catch {
      Alert.alert('Ошибка', 'Не удалось обновить пост');
    }
  };


  const deletePost = (id) => {
    Alert.alert('Удаление', 'Удалить пост?', [
      { text: 'Отмена' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          await authFetch(`${API}/posts/${id}`, { method: 'DELETE' });
          activeTab === 'all' ? loadPosts() : loadMyPosts();
        },
      },
    ]);
  };


  const renderPost = ({ item }) => {
    const isAuthor = user?.id === item.authorId;

    return (
      <PostCard>
        <PostTitle>{item.title}</PostTitle>
        <PostText>{item.content}</PostText>
        <Author>Автор: {item.author.name}</Author>

        {isAuthor && activeTab === 'my' && (
          <Actions>
            <Action
              onPress={() => {
                setEditingPost(item);
                setTitle(item.title);
                setContent(item.content);
              }}
            >
              <ActionText>✏️ Редактировать</ActionText>
            </Action>

            <Action onPress={() => deletePost(item.id)}>
              <ActionText>🗑 Удалить</ActionText>
            </Action>
          </Actions>
        )}
      </PostCard>
    );
  };

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === 'all'} onPress={() => setActiveTab('all')}>
          <TabText active={activeTab === 'all'}>Все посты</TabText>
        </Tab>

        {isAuthenticated && (
          <Tab active={activeTab === 'my'} onPress={() => setActiveTab('my')}>
            <TabText active={activeTab === 'my'}>Мои посты</TabText>
          </Tab>
        )}
      </Tabs>

      {isAuthenticated && activeTab === 'my' && (
        <Card>
          <Input
            placeholder="Заголовок"
            placeholderTextColor="#9aa4b2"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            placeholder="Текст поста"
            placeholderTextColor="#9aa4b2"
            value={content}
            onChangeText={setContent}
            multiline
          />

          <Button onPress={editingPost ? updatePost : createPost}>
            <ButtonText>
              {editingPost ? 'Обновить пост' : 'Создать пост'}
            </ButtonText>
          </Button>
        </Card>
      )}

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
        />
      )}
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  background: #0f2042;
  padding: 16px;
`;

const Tabs = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  background: #0c0f14;
  border-radius: 12px;
  overflow: hidden;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  align-items: center;
  background: ${({ active }) => (active ? '#4b87a2' : 'transparent')};
`;

const TabText = styled.Text`
  color: ${({ active }) => (active ? '#052925' : '#9aa4b2')};
  font-weight: 700;
`;

const Card = styled.View`
  background: #0c0f14;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Input = styled.TextInput`
  background: #0f1218;
  border: 1px solid #1c2230;
  border-radius: 12px;
  padding: 12px;
  color: #e6e9ef;
  margin-bottom: 10px;
`;

const Button = styled.TouchableOpacity`
  background: #4b87a2;
  padding: 12px;
  border-radius: 12px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #052925;
  font-weight: 700;
`;

const PostCard = styled.View`
  background: #0c0f14;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
`;

const PostTitle = styled.Text`
  color: #e6e9ef;
  font-size: 18px;
  font-weight: 700;
`;

const PostText = styled.Text`
  color: #9aa4b2;
  margin: 8px 0;
`;

const Author = styled.Text`
  color: #889096;
  font-size: 12px;
`;

const Actions = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

const Action = styled.TouchableOpacity`
  margin-right: 16px;
`;

const ActionText = styled.Text`
  font-size: 16px;
  color: #e6e9ef;
`;
