import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { styles } from "./styles";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

// Генерируем большой список товаров для демонстрации оптимизации
const generateProducts = (): Product[] => {
  const categories = ['Электроника', 'Одежда', 'Книги', 'Продукты', 'Спорт'];
  const names = {
    'Электроника': ['Телефон', 'Ноутбук', 'Планшет', 'Наушники', 'Часы'],
    'Одежда': ['Футболка', 'Джинсы', 'Куртка', 'Кроссовки', 'Шапка'],
    'Книги': ['Роман', 'Детектив', 'Фантастика', 'Учебник', 'Комикс'],
    'Продукты': ['Хлеб', 'Молоко', 'Яйца', 'Мясо', 'Овощи'],
    'Спорт': ['Мяч', 'Гантели', 'Коврик', 'Скакалка', 'Велосипед']
  };

  const products: Product[] = [];
  let id = 1;

  categories.forEach(category => {
    names[category as keyof typeof names].forEach(name => {
      for (let i = 0; i < 20; i++) {
        products.push({
          id: id++,
          name: `${name} ${i + 1}`,
          category,
          price: Math.floor(Math.random() * 10000) + 100,
          rating: Math.floor(Math.random() * 50) / 10
        });
      }
    });
  });

  return products;
};

const PRODUCTS = generateProducts();

export default function UseMemoExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [renderCount, setRenderCount] = useState(0);

  // Получаем цвета для текущей темы
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');
  const borderColor = useThemeColor({ light: '#ddd', dark: '#38383A' }, 'background');
  const inputBg = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');
  const buttonBg = useThemeColor({ light: '#f0f0f0', dark: '#2C2C2E' }, 'background');
  const secondaryText = useThemeColor({ light: '#666', dark: '#999' }, 'text');

 

  const categories = ['Все', 'Электроника', 'Одежда', 'Книги', 'Продукты', 'Спорт'];

  // useMemo для фильтрации и сортировки - вычисляется только при изменении зависимостей
  const filteredAndSortedProducts = useMemo(() => {
    console.log('🔄 Пересчет фильтрованного списка...');

    let result = PRODUCTS;

    // Фильтрация по категории
    if (selectedCategory !== 'Все') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Сортировка
    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // useMemo для статистики - вычисляется только при изменении отфильтрованного списка
  const statistics = useMemo(() => {
    console.log('📊 Пересчет статистики...');

    if (filteredAndSortedProducts.length === 0) {
      return {
        count: 0,
        avgPrice: 0,
        maxPrice: 0,
        minPrice: 0,
        avgRating: 0
      };
    }

    const totalPrice = filteredAndSortedProducts.reduce((sum, p) => sum + p.price, 0);
    const totalRating = filteredAndSortedProducts.reduce((sum, p) => sum + p.rating, 0);

    return {
      count: filteredAndSortedProducts.length,
      avgPrice: Math.round(totalPrice / filteredAndSortedProducts.length),
      maxPrice: Math.max(...filteredAndSortedProducts.map(p => p.price)),
      minPrice: Math.min(...filteredAndSortedProducts.map(p => p.price)),
      avgRating: (totalRating / filteredAndSortedProducts.length).toFixed(1)
    };
  }, [filteredAndSortedProducts]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={[styles.productCard, { backgroundColor: cardBg, borderColor }]}>
      <View style={styles.productHeader}>
        <ThemedText style={styles.productName}>{item.name}</ThemedText>
        <ThemedText style={styles.productPrice}>{item.price} ₽</ThemedText>
      </View>
      <View style={styles.productFooter}>
        <ThemedText style={styles.productCategory}>{item.category}</ThemedText>
        <ThemedText style={styles.productRating}>⭐ {item.rating}</ThemedText>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>Пример useMemo: супер стандартный список товаров с статистикой и сортировкой</ThemedText>
          <ThemedText style={styles.subtitle}>Оптимизация вычислений</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoBox}>
          <ThemedText type="subtitle" style={styles.infoTitle}>Что происходит:</ThemedText>
          <ThemedText style={styles.infoText}>
            • useMemo кэширует результаты фильтрации{'\n'}
            • Пересчет только при изменении зависимостей{'\n'}
            • Всего товаров в базе: {PRODUCTS.length}{'\n'}
          </ThemedText>
        </ThemedView>

        {/* Поиск */}
        <ThemedView style={styles.searchSection}>
          <ThemedText style={styles.sectionTitle}>Поиск:</ThemedText>
          <TextInput
            style={[styles.searchInput, { backgroundColor: inputBg, borderColor, color: textColor }]}
            placeholder="Введите название товара..."
            placeholderTextColor={secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </ThemedView>

        {/* Категории */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Категория:</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    { backgroundColor: buttonBg, borderColor },
                    selectedCategory === cat && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(cat)}>
                  <ThemedText
                    style={[
                      styles.categoryText,
                      selectedCategory === cat && styles.categoryTextActive
                    ]}>
                    {cat}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </ThemedView>

        {/* Сортировка */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Сортировка:</ThemedText>
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: buttonBg, borderColor },
                sortBy === 'name' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('name')}>
              <ThemedText style={styles.sortText}>По имени</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: buttonBg, borderColor },
                sortBy === 'price' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('price')}>
              <ThemedText style={styles.sortText}>По цене</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                { backgroundColor: buttonBg, borderColor },
                sortBy === 'rating' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('rating')}>
              <ThemedText style={styles.sortText}>По рейтингу</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Статистика */}
        <ThemedView style={[styles.statsBox, { borderColor }]}>
          <ThemedText type="subtitle" style={styles.statsTitle}>Статистика:</ThemedText>
          <View style={styles.statsGrid}>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <ThemedText style={styles.statValue}>{statistics.count}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: secondaryText }]}>Найдено</ThemedText>
            </View>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <ThemedText style={styles.statValue}>{statistics.avgPrice} ₽</ThemedText>
              <ThemedText style={[styles.statLabel, { color: secondaryText }]}>Средняя цена</ThemedText>
            </View>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <ThemedText style={styles.statValue}>{statistics.maxPrice} ₽</ThemedText>
              <ThemedText style={[styles.statLabel, { color: secondaryText }]}>Макс. цена</ThemedText>
            </View>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <ThemedText style={styles.statValue}>⭐ {statistics.avgRating}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: secondaryText }]}>Средний рейтинг</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Список товаров */}
        <ThemedView style={styles.productsSection}>
          <ThemedText style={styles.sectionTitle}>
            Товары ({filteredAndSortedProducts.length}):
          </ThemedText>
          <View style={styles.productsList}>
            {filteredAndSortedProducts.slice(0, 50).map(product => (
              <View key={product.id}>
                {renderProduct({ item: product })}
              </View>
            ))}
            {filteredAndSortedProducts.length > 50 && (
              <ThemedText style={styles.moreText}>
                ... и еще {filteredAndSortedProducts.length - 50} товаров
              </ThemedText>
            )}
          </View>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

