import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, Image as RNImage, Dimensions, Text } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from "./styles";
type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default function UseEffectExample() {
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const imageBg = useThemeColor({ light: '#f0f0f0', dark: '#2C2C2E' }, 'background');

  const screenWidth = Dimensions.get('window').width - 32;
  const imageHeight = (screenWidth / 16) * 9;

  const fetchCatImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');

      if (!response.ok) {
        throw new Error('Ошибка загрузки');
      }

      const data = await response.json();
      setCatImage(data[0]);
      setFetchCount(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
  }, []); 

  useEffect(() => {
    if (fetchCount > 0) {
      console.log(`Загружено изображений кошек: ${fetchCount}`);
    }
  }, [fetchCount]);

  const handleLoadNewCat = () => {
    fetchCatImage();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Пример useEffect: тапалка котейек</Text>
          <Text style={styles.subtitle}>Загрузка данных из API</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Что происходит:</Text>
          <Text style={styles.infoText}>
            • useEffect загружает фото при открытии вкладки{'\n'}
            • useState хранит данные и состояние загрузки{'\n'}
            • API: thecatapi.com{'\n'}
            • Загружено фотографий: {fetchCount}
          </Text>
        </View>

        <View style={[styles.imageContainer, { height: imageHeight, backgroundColor: imageBg }]}>
          {loading ? (
            <View style={[styles.loadingContainer, { height: imageHeight }]}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Загрузка котика...</Text>
            </View>
          ) : error ? (
            <View style={[styles.errorContainer, { height: imageHeight }]}>
              <Text style={styles.errorText}>❌ {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleLoadNewCat}>
                <Text style={styles.buttonText}>Попробовать снова</Text>
              </TouchableOpacity>
            </View>
          ) : catImage ? (
            <TouchableOpacity
              style={styles.catImageWrapper}
              onPress={handleLoadNewCat}
              activeOpacity={0.8}>
              <RNImage
                source={{ uri: catImage.url }}
                style={[styles.catImage, { width: screenWidth, height: imageHeight }]}
                resizeMode="contain"
              />
              <Text style={styles.imageInfo}>
                ID: {catImage.id.substring(0, 8)}... • Формат 16:9
              </Text>
              <View style={styles.tapHint}>
                <Text style={styles.tapHintText}>👆 Нажми для новой кошки</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.stats}>
          <Text style={styles.statsText}>
            Статистика:{'\n'}
            Состояние: {loading ? 'Загрузка' : 'Готово'}{'\n'}
            Ошибок: {error ? '1' : '0'}{'\n'}
            Всего загрузок: {fetchCount}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}