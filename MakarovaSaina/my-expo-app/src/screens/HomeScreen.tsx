import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CommonStyles, Colors, HomeStyles } from './styles';

type Props = {
  navigation: DrawerNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();

  const features = [
    { title: 'useState Хук', screen: 'UseState', color: Colors.pink },
    { title: 'useEffect Хук', screen: 'UseEffect', color: Colors.accent },
    { title: 'useMemo Хук', screen: 'UseMemo', color: Colors.lightAccent },
    { title: 'Zustand', screen: 'Zustand', color: Colors.lightAccent },
  ];

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <ScrollView style={CommonStyles.container}>
        <View style={HomeStyles.header}>
          <Text style={HomeStyles.welcome}>Добро пожаловать! 👋</Text>
          <Text style={HomeStyles.userName}>{user?.name}</Text>
        </View>

        <View style={HomeStyles.featuresContainer}>
          <Text style={CommonStyles.sectionTitle}>Лабораторные работы</Text>
          
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