import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
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
    <View style={[styles.productCard]}>
      <View style={styles.productHeader}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} ₽</Text>
      </View>
      <View style={styles.productFooter}>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productRating}>⭐ {item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Пример useMemo: супер стандартный список товаров с статистикой и сортировкой</Text>
          <Text style={styles.subtitle}>Оптимизация вычислений</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Что происходит:</Text>
          <Text style={styles.infoText}>
            • useMemo кэширует результаты фильтрации{'\n'}
            • Пересчет только при изменении зависимостей{'\n'}
            • Всего товаров в базе: {PRODUCTS.length}{'\n'}
          </Text>
        </View>

        {/* Поиск */}
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Поиск:</Text>
          <TextInput
            style={[styles.searchInput]}
            placeholder="Введите название товара..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Категории */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Категория:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryContainer}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(cat)}>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat && styles.categoryTextActive
                    ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Сортировка */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Сортировка:</Text>
          <View style={styles.sortContainer}>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'name' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('name')}>
              <Text style={styles.sortText}>По имени</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'price' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('price')}>
              <Text style={styles.sortText}>По цене</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sortButton,
                sortBy === 'rating' && styles.sortButtonActive
              ]}
              onPress={() => setSortBy('rating')}>
              <Text style={styles.sortText}>По рейтингу</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Статистика */}
        <View style={[styles.statsBox]}>
          <Text style={styles.statsTitle}>Статистика:</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statItem]}>
              <Text style={styles.statValue}>{statistics.count}</Text>
              <Text style={[styles.statLabel]}>Найдено</Text>
            </View>
            <View style={[styles.statItem]}>
              <Text style={styles.statValue}>{statistics.avgPrice} ₽</Text>
              <Text style={[styles.statLabel]}>Средняя цена</Text>
            </View>
            <View style={[styles.statItem]}>
              <Text style={styles.statValue}>{statistics.maxPrice} ₽</Text>
              <Text style={[styles.statLabel]}>Макс. цена</Text>
            </View>
            <View style={[styles.statItem]}>
              <Text style={styles.statValue}>⭐ {statistics.avgRating}</Text>
              <Text style={[styles.statLabel]}>Средний рейтинг</Text>
            </View>
          </View>
        </View>

        {/* Список товаров */}
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>
            Товары ({filteredAndSortedProducts.length}):
          </Text>
          <View style={styles.productsList}>
            {filteredAndSortedProducts.slice(0, 50).map(product => (
              <View key={product.id}>
                {renderProduct({ item: product })}
              </View>
            ))}
            {filteredAndSortedProducts.length > 50 && (
              <Text style={styles.moreText}>
                ... и еще {filteredAndSortedProducts.length - 50} товаров
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

