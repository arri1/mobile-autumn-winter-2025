import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { UseEffectStyles } from './UseEffectStyle';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default function UseEffectLab({ navigation }: any) {
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
      <SafeAreaView style={UseEffectStyles.safeArea}>
        <View style={UseEffectStyles.centerContainer}>
          <ActivityIndicator size="large" color="#66FCF1" />
          <Text style={UseEffectStyles.loadingText}>Загрузка постов...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={UseEffectStyles.safeArea}>
      <View style={UseEffectStyles.container}>
        <Text style={UseEffectStyles.title}>useEffect 🎣</Text>
        
        <View style={UseEffectStyles.counterContainer}>
          <Text style={UseEffectStyles.counterTitle}>Счетчик: {counter}</Text>
          <TouchableOpacity 
            style={UseEffectStyles.counterButton} 
            onPress={incrementCounter}
          >
            <Text style={UseEffectStyles.counterButtonText}>+1</Text>
          </TouchableOpacity>
        </View>

        <View style={UseEffectStyles.postsContainer}>
          <Text style={UseEffectStyles.sectionTitle}>Посты с API ({posts.length})</Text>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={UseEffectStyles.postCard}
              onPress={() => showPost(post)}
            >
              <Text style={UseEffectStyles.postTitle}>{post.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={UseEffectStyles.buttonsContainer}>
          <TouchableOpacity 
            style={UseEffectStyles.primaryButton} 
            onPress={loadData}
          >
            <Text style={UseEffectStyles.primaryButtonText}>Обновить посты</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={UseEffectStyles.navButton} 
            onPress={() => navigation.navigate('UseState')}
            activeOpacity={0.7}>
            <Text style={UseEffectStyles.navButtonText}>Перейти к useState →</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={UseEffectStyles.navButton} 
            onPress={() => navigation.navigate('UseMemo')}
            activeOpacity={0.7}
          >
            <Text style={UseEffectStyles.navButtonText}>→ Перейти к useMemo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={UseEffectStyles.navButton} 
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={UseEffectStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}