import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
  navigation: DrawerNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  const { user } = useAuth();

  const features = [
    {
      title: 'useState Хук',
      screen: 'UseState',
      color: '#ff859bff',
    },
    {
      title: 'useEffect Хук',
      screen: 'UseEffect',
      color: '#45A29E',
    },
    {
      title: 'useMemo Хук',
      screen: 'UseMemo',
      color: '#66FCF1',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Добро пожаловать! 👋</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Лабораторные работы</Text>
          
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.featureCard, { borderLeftColor: feature.color }]}
              onPress={() => navigation.navigate(feature.screen)}
            >
              <View style={styles.featureHeader}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2833',
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#66FCF1',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#1F2833',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featureArrow: {
    fontSize: 20,
    color: '#C5C6C7',
  },
  featureDescription: {
    fontSize: 14,
    color: '#C5C6C7',
    lineHeight: 20,
  },
  infoContainer: {
    backgroundColor: '#1F2833',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#66FCF1',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#C5C6C7',
    lineHeight: 20,
  },
});