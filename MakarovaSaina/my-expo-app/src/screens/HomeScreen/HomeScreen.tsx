import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeStyles } from './HomeScreenStyle';

type Props = {
  navigation: DrawerNavigationProp<any>;
};

export default function HomeLab({ navigation }: Props) {
  const { user, logout } = useAuth();

  // const handleLogout = async () => {
  //   Alert.alert(
  //     'Выход',
  //     'Вы уверены, что хотите выйти?',
  //     [
  //       { text: 'Отмена', style: 'cancel' },
  //       { 
  //         text: 'Выйти', 
  //         style: 'destructive',
  //         onPress: async () => {
  //           try {
  //             await logout();
  //             navigation.navigate('LoginScreen');
  //           } catch (error) {
  //             console.error('Logout error:', error);
  //             Alert.alert('Ошибка', 'Не удалось выйти из системы');
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

  const features = [
    { title: 'Посты', screen: 'Posts', color: '#66FCF1' },
    { title: 'Пользователи', screen: 'Users', color: '#ffaabaff' },
    { title: 'useState Хук', screen: 'UseState', color: '#ff859bff' },
    { title: 'useEffect Хук', screen: 'UseEffect', color: '#45A29E' },
    { title: 'useMemo Хук', screen: 'UseMemo', color: '#66FCF1' },
    { title: 'Zustand', screen: 'Zustand', color: '#66FCF1' },
  ];

  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <ScrollView style={HomeStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.welcome}>Добро пожаловать!</Text>
          <Text style={HomeStyles.userName}>{user?.name || user?.email}</Text>
          

          {/* <TouchableOpacity 
            style={HomeStyles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={HomeStyles.logoutButtonText}>Выйти</Text>
          </TouchableOpacity> */}
        </View>

        <View style={HomeStyles.featuresContainer}>
          <Text style={HomeStyles.sectionTitle}>Лабораторные работы</Text>
          
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[HomeStyles.featureCard, { borderLeftColor: feature.color }]}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <View style={HomeStyles.featureHeader}>
                <Text style={HomeStyles.featureTitle}>{feature.title}</Text>
                <Text style={HomeStyles.featureArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}