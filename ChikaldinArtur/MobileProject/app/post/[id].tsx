import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { fetchPostById, deletePost } from '../apiPosts/posts';
import { router } from 'expo-router';

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPostById(id).then(setPost).finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Удалить пост?')) {
      await deletePost(id);
      router.back();
    }
  };

  if (loading) return <ActivityIndicator />;
  if (!post) return <Text>Пост не найден</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{post.title}</Text>
      <Text style={{ marginVertical: 16 }}>{post.content}</Text>
      <Text>Автор: {post.author.name || post.author.email}</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 20 }}>
        <Button title="Редактировать" onPress={() => router.push(`/editPost?id=${id}`)} />
        <Button title="Удалить" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
}