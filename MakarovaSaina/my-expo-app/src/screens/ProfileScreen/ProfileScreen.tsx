import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { HomeStyles } from '../HomeScreen/HomeScreenStyle';

export default function ProfileScreen({ navigation }: any) {
  const { user } = useAuth();

  if (!user) {
    return (
      <SafeAreaView style={HomeStyles.safeArea}>
        <View style={HomeStyles.container}>
          <Text style={HomeStyles.welcome}>Профиль недоступен</Text>
          <Text style={HomeStyles.userName}>Пользователь не авторизован</Text>
          <TouchableOpacity
            style={[HomeStyles.featureCard, { borderLeftColor: '#ff859bff' }]}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={HomeStyles.featureHeader}>
              <Text style={HomeStyles.featureTitle}>Перейти к экрану входа</Text>
              <Text style={HomeStyles.featureArrow}>→</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString('ru-RU') : '—';
  const updatedAt = user.updatedAt ? new Date(user.updatedAt).toLocaleString('ru-RU') : '—';

  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <ScrollView style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.welcome}>Мой профиль</Text>
          <Text style={HomeStyles.userName}>{user.name || user.email}</Text>
        </View>

        <View style={HomeStyles.featuresContainer}>
          <Text style={HomeStyles.sectionTitle}>Информация об аккаунте</Text>

          <View style={[HomeStyles.featureCard, { borderLeftColor: '#ff859bff' }]}>
            <View style={HomeStyles.featureHeader}>
              <Text style={HomeStyles.featureTitle}>Email</Text>
            </View>
            <Text style={{ color: '#C5C6C7', marginTop: 4 }}>{user.email}</Text>
          </View>

          {user.name && (
            <View style={[HomeStyles.featureCard, { borderLeftColor: '#66FCF1' }]}>
              <View style={HomeStyles.featureHeader}>
                <Text style={HomeStyles.featureTitle}>Имя</Text>
              </View>
              <Text style={{ color: '#C5C6C7', marginTop: 4 }}>{user.name}</Text>
            </View>
          )}

          {user.role && (
            <View style={[HomeStyles.featureCard, { borderLeftColor: '#45A29E' }]}>
              <View style={HomeStyles.featureHeader}>
                <Text style={HomeStyles.featureTitle}>Роль</Text>
              </View>
              <Text style={{ color: '#C5C6C7', marginTop: 4 }}>{user.role}</Text>
            </View>
          )}

          <View style={[HomeStyles.featureCard, { borderLeftColor: '#ffaabaff' }]}>
            <View style={HomeStyles.featureHeader}>
              <Text style={HomeStyles.featureTitle}>Дата регистрации</Text>
            </View>
            <Text style={{ color: '#C5C6C7', marginTop: 4 }}>{createdAt}</Text>
          </View>

          <View style={[HomeStyles.featureCard, { borderLeftColor: '#ffaabaff' }]}>
            <View style={HomeStyles.featureHeader}>
              <Text style={HomeStyles.featureTitle}>Последнее обновление</Text>
            </View>
            <Text style={{ color: '#C5C6C7', marginTop: 4 }}>{updatedAt}</Text>
          </View>
        </View>

        <View style={{ marginTop: 24, marginBottom: 16 }}>
          <TouchableOpacity
            style={[HomeStyles.featureCard, { borderLeftColor: '#ff859bff' }]}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={HomeStyles.featureHeader}>
              <Text style={HomeStyles.featureTitle}>← На главную</Text>
              <Text style={HomeStyles.featureArrow}>Домой</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


