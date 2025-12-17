import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity,  } from 'react-native';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from "./_styles";
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function AboutScreen() {
  const { actualColorScheme, toggleTheme } = useTheme();
  const buttonBg = useThemeColor({ light: '#007AFF', dark: '#0A84FF' }, 'tint');
  return (
    <ScrollView style={styles.scrollView}>
      <ThemedView style={styles.container}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText style={styles.mainTitle}>
            О приложении
          </ThemedText>
          <ThemedView style={styles.divider} />

          {/* Theme Toggle Button */}
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: buttonBg }]}
            onPress={toggleTheme}
            activeOpacity={0.7}>
            <ThemedText style={styles.themeButtonText}>
              {actualColorScheme === 'dark' ? '☀️' : '🌙'}
              {' '}
              {actualColorScheme === 'dark' ? 'Светлая тема' : 'Темная тема'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Profile Section */}
        <ThemedView style={styles.profileSection}>
          <ThemedView style={styles.photoContainer}>
            <Image
              source={require('@/assets/images/profile.jpg')}
              style={styles.profilePhoto}
            />
          </ThemedView>

          <ThemedText style={styles.name}>
            Васильев Харысхан
          </ThemedText>

          <ThemedText style={styles.info}>
            ФИИТ-22
          </ThemedText>
        </ThemedView>

        {/* Project Info */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            О проекте
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Данное приложение разработано в рамках изучения дисциплины
            "Разработка мобильных приложений" в Северо-Восточном федеральном
            университете имени М.К. Аммосова.
          </ThemedText>
        </ThemedView>

        {/* Features */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Функционал
          </ThemedText>
          <ThemedView style={styles.featuresList}>
            <ThemedView style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🎨</ThemedText>
              <ThemedView style={styles.featureTextContainer}>
                <ThemedText style={styles.featureTitle}>useState</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Интерактивное рисование пальцем с выбором цвета и размера кисти
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>🐱</ThemedText>
              <ThemedView style={styles.featureTextContainer}>
                <ThemedText style={styles.featureTitle}>useEffect</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Загрузка случайных фотографий кошек из API в формате 16:9
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.featureItem}>
              <ThemedText style={styles.featureIcon}>📊</ThemedText>
              <ThemedView style={styles.featureTextContainer}>
                <ThemedText style={styles.featureTitle}>useMemo</ThemedText>
                <ThemedText style={styles.featureDescription}>
                  Оптимизация производительности с фильтрацией и сортировкой 500 товаров
                </ThemedText>
              </ThemedView>
            </ThemedView>

          </ThemedView>
        </ThemedView>

        {/* Technologies */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Технологии
          </ThemedText>
          <ThemedView style={styles.techGrid}>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>React Native</ThemedText>
            </ThemedView>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>TypeScript</ThemedText>
            </ThemedView>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>Expo</ThemedText>
            </ThemedView>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>React Hooks</ThemedText>
            </ThemedView>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>SVG</ThemedText>
            </ThemedView>
            <ThemedView style={styles.techBadge}>
              <ThemedText style={styles.techText}>Gestures</ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Contact */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Контакты
          </ThemedText>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Университет:</ThemedText>
            <ThemedText style={styles.contactValue}>СВФУ им. М.К. Аммосова</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Факультет:</ThemedText>
            <ThemedText style={styles.contactValue}>ФИИиТ</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Группа:</ThemedText>
            <ThemedText style={styles.contactValue}>ФИИТ-22</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>Телеграм:</ThemedText>
            <ThemedText style={styles.contactValue}>https://t.me/DartGrid</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactItem}>
            <ThemedText style={styles.contactLabel}>GitHub:</ThemedText>
            <ThemedText style={styles.contactValue}>Dartgrid</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Footer */}
        <ThemedView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            © 2025 • Разработка мобильных приложений
          </ThemedText>
          <ThemedText style={styles.footerSubtext}>
            Сделано в Якутске
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}