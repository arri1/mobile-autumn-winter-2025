import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { HookStyles } from './styles';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function UseEffectScreen({ navigation }: any) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Количество постов:', posts.length);
  }, [posts]);

  useEffect(() => {
    console.log('Счетчик обновлен:', counter);
  }, [counter]);

  const fetchData = async () => {
    try {
      console.log('Загрузка данных...');
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  const loadData = () => {
    setLoading(true);
    fetchData();
  };

  const incrementCounter = () => setCounter(counter + 1);

  const showPost = (post: Post) => {
    Alert.alert(post.title, post.body);
  };

  if (loading) {
    return (
      <SafeAreaView style={HookStyles.safeArea}>
        <View style={HookStyles.centerContainer}>
          <ActivityIndicator size="large" color="#66FCF1" />
          <Text style={HookStyles.loadingText}>Загрузка постов...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={HookStyles.safeArea}>
      <View style={HookStyles.container}>
        <Text style={HookStyles.title}>useEffect 🎣</Text>
        
        <View style={HookStyles.counterContainer}>
          <Text style={HookStyles.counterTitle}>Счетчик: {counter}</Text>
          <TouchableOpacity style={HookStyles.counterButton} onPress={incrementCounter}>
            <Text style={HookStyles.counterButtonText}>+1</Text>
          </TouchableOpacity>
        </View>

        <View style={HookStyles.postsContainer}>
          <Text style={HookStyles.sectionTitle}>Посты с API ({posts.length})</Text>
          {posts.map((post) => (
            <TouchableOpacity key={post.id} style={HookStyles.postCard} onPress={() => showPost(post)}>
              <Text style={HookStyles.postTitle}>{post.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={HookStyles.buttonsContainer}>
          <TouchableOpacity style={HookStyles.primaryButton} onPress={loadData}>
            <Text style={HookStyles.primaryButtonText}>Обновить посты</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('UseState')}>
            <Text style={HookStyles.navButtonText}>Перейти к useState →</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('UseMemo')}>
            <Text style={HookStyles.navButtonText}>→ Перейти к useMemo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('Home')}>
            <Text style={HookStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}