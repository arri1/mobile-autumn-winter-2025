import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeStyles } from './HomeScreenStyle';

type Props = {
  navigation: DrawerNavigationProp<any>;
};

export default function HomeLab({ navigation }: Props) {
  const { user } = useAuth();

  const features = [
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
          <Text style={HomeStyles.userName}>{user?.name}</Text>
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