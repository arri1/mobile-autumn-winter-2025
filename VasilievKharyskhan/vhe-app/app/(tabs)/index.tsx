import React from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from "./styles";

export default function AboutScreen() {
  const { actualColorScheme, toggleTheme } = useTheme();
  const buttonBg = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>
            О приложении
          </Text>
          <View style={styles.divider} />

          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: buttonBg }]}
            onPress={toggleTheme}
            activeOpacity={0.7}>
            <Text style={styles.themeButtonText}>
              {actualColorScheme === 'dark' ? '☀️' : '🌙'}
              {' '}
              {actualColorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.photoContainer}>
            <Image
              source={require('@/assets/images/profile.jpg')}
              style={styles.profilePhoto}
            />
          </View>

          <Text style={styles.name}>
            Васильев Харысхан
          </Text>

          <Text style={styles.info}>
            ФИИТ-22
          </Text>
        </View>

        {/* Project Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            О проекте
          </Text>
          <Text style={styles.cardText}>
            Данное приложение разработано в рамках изучения дисциплины
            "Разработка мобильных приложений" в Северо-Восточном федеральном
            университете имени М.К. Аммосова.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Функционал
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎨</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>useState</Text>
                <Text style={styles.featureDescription}>
                  Интерактивное рисование пальцем с выбором цвета и размера кисти
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🐱</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>useEffect</Text>
                <Text style={styles.featureDescription}>
                  Загрузка случайных фотографий кошек из API в формате 16:9
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>useMemo</Text>
                <Text style={styles.featureDescription}>
                  Оптимизация производительности с фильтрацией и сортировкой 500 товаров
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* Technologies */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Технологии
          </Text>
          <View style={styles.techGrid}>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>React Native</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>TypeScript</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>Expo</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>React Hooks</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>SVG</Text>
            </View>
            <View style={styles.techBadge}>
              <Text style={styles.techText}>Gestures</Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Контакты
          </Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Университет:</Text>
            <Text style={styles.contactValue}>СВФУ им. М.К. Аммосова</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Факультет:</Text>
            <Text style={styles.contactValue}>ФИИиТ</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Группа:</Text>
            <Text style={styles.contactValue}>ФИИТ-22</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Телеграм:</Text>
            <Text style={styles.contactValue}>https://t.me/DartGrid</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>GitHub:</Text>
            <Text style={styles.contactValue}>Dartgrid</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 • Разработка мобильных приложений
          </Text>
          <Text style={styles.footerSubtext}>
            Сделано в Якутске
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}