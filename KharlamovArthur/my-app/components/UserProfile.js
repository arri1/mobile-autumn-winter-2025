import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://api.example.com/users/${userId}`);
        const userData = await response.json();
        
        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>Имя: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
    </View>
  );
};

export default UserProfile;