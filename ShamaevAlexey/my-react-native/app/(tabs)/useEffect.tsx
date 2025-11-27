import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const json: Post = await response.json()
        setData(json);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>{data?.title}</Text>
      <Text>{data?.body}</Text>
    </View>
  );
}