import { useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useMemoStyles } from '../styles/useMemoStyles';
import { useAppStore } from '../store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from '../styles/appStyles';

const UseMemoScreen = () => {
  const [input, setInput] = useState('1,2,3');
  const [showSubsets, setShowSubsets] = useState(false);
  const [calculationResult, setCalculationResult] = useState<{
    elementsCount: number;
    subsetsCount: number;
    actualSubsets: number;
  } | null>(null);
  
  // Используем Zustand store
  const { theme, counters, incrementCounter } = useAppStore();
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  // Выносим логику генерации подмножеств в отдельную функцию
  const generateSubsets = useCallback((items: string[]) => {
    if (!items.length) {
      return [[]];
    }

    const buildSubsets = (arr: string[]): string[][] => {
      if (!arr.length) {
        return [[]];
      }

      const [first, ...rest] = arr;
      const subsetsWithoutFirst = buildSubsets(rest);
      const subsetsWithFirst = subsetsWithoutFirst.map((subset) => [
        first,
        ...subset,
      ]);

      return [...subsetsWithoutFirst, ...subsetsWithFirst];
    };

    return buildSubsets(items).sort((a, b) => a.length - b.length);
  }, []);

  const items = useMemo(() => 
    input
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    [input]
  );

  const subsets = useMemo(() => {
    if (!showSubsets) return [];
    
    return generateSubsets(items);
  }, [items, showSubsets, generateSubsets]);

  const elementsCount = useMemo(() => items.length, [items]);

  // Функция для расчета количества подмножеств по формуле 2^n
  const calculateSubsetsCount = () => {
    return Math.pow(2, elementsCount);
  };

  const handleCalculateSubsets = () => {
    if (elementsCount === 0) {
      alert('Введите хотя бы один элемент!');
      return;
    }

    if (elementsCount > 8) {
      alert('Слишком много элементов! Рекомендуется не более 8 для лучшей производительности.');
      return;
    }

    setShowSubsets(true);
    const calculatedCount = calculateSubsetsCount();
    setCalculationResult({
      elementsCount,
      subsetsCount: calculatedCount,
      actualSubsets: calculatedCount,
    });
    
    // Инкрементируем счетчик только при нажатии кнопки
    incrementCounter('useMemo');
  };

  const handleReset = () => {
    setShowSubsets(false);
    setCalculationResult(null);
  };

  const renderSubset = ({ item, index }: { item: string[]; index: number }) => (
    <View style={[useMemoStyles.subsetItem, { backgroundColor: themeStyles.card, borderColor: themeStyles.border }]}>
      <Text style={[useMemoStyles.subsetIndex, { color: themeStyles.secondary }]}>{index + 1}.</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={useMemoStyles.subsetScroll}
      >
        <Text style={[useMemoStyles.subsetText, { color: themeStyles.primary }]}>
          {item.length ? `{${item.join(', ')}}` : '∅'}
        </Text>
      </ScrollView>
    </View>
  );

  return (
    <View style={[useMemoStyles.container, { backgroundColor: themeStyles.background }]}>
      <Text style={[useMemoStyles.heading, { color: themeStyles.text }]}>
        UseMemo - Генератор подмножеств
      </Text>

      {/* Статистика использования */}
      <View style={{ 
        backgroundColor: themeStyles.card, 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 16,
        borderWidth: 1,
        borderColor: themeStyles.border
      }}>
        <Text style={{ color: themeStyles.text, fontSize: 14, fontWeight: 600 }}>
          Использований useMemo: {counters.useMemo}
        </Text>
      </View>

      <View style={[useMemoStyles.card, { backgroundColor: themeStyles.card }]}>
        <Text style={[useMemoStyles.label, { color: themeStyles.text }]}>
          Введите элементы множества (через запятую)
        </Text>
        <TextInput
          value={input}
          onChangeText={(text) => {
            setInput(text);
            setShowSubsets(false);
            setCalculationResult(null);
          }}
          placeholder="Например: 1, 2, 3 или a, b, c"
          placeholderTextColor={themeStyles.secondary}
          style={[useMemoStyles.input, { 
            color: themeStyles.text, 
            borderColor: themeStyles.border,
            backgroundColor: theme === 'dark' ? '#374151' : '#f8fafc'
          }]}
        />

        <Text style={[useMemoStyles.hint, { color: themeStyles.secondary }]}>
          Элементов: {elementsCount} {elementsCount > 0 && `(2^${elementsCount} = ${calculateSubsetsCount()} подмножеств)`}
        </Text>

        {/* Кнопки управления */}
        <View style={useMemoStyles.buttonContainer}>
          <TouchableOpacity
            style={[
              useMemoStyles.calculateButton,
              { backgroundColor: themeStyles.primary }
            ]}
            onPress={handleCalculateSubsets}
            disabled={elementsCount === 0}
          >
            <Text style={useMemoStyles.calculateButtonText}>
              Сгенерировать подмножества
            </Text>
          </TouchableOpacity>

          {showSubsets && (
            <TouchableOpacity
              style={[
                useMemoStyles.resetButton,
                { backgroundColor: '#dc2626' }
              ]}
              onPress={handleReset}
            >
              <Text style={useMemoStyles.calculateButtonText}>
                Сбросить
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Блок с информацией о расчете */}
        {calculationResult && (
          <View style={[useMemoStyles.calculationBox, { backgroundColor: themeStyles.card, borderColor: themeStyles.border }]}>
            <Text style={[useMemoStyles.calculationText, { color: themeStyles.secondary }]}>
              Информация о множестве
            </Text>
            <Text style={[useMemoStyles.calculationText, { color: themeStyles.secondary }]}>
              Элементы: {items.join(', ')}
            </Text>
            <Text style={[useMemoStyles.calculationText, { color: themeStyles.secondary }]}>
              Количество элементов: n = {calculationResult.elementsCount}
            </Text>
            <Text style={[useMemoStyles.calculationText, { color: themeStyles.secondary }]}>
              Формула количества подмножеств: 2^n
            </Text>
            <Text style={[useMemoStyles.calculationResult, { color: themeStyles.primary }]}>
              Ожидаемое количество: 2^{calculationResult.elementsCount} = {calculationResult.subsetsCount}
            </Text>
            <Text style={[useMemoStyles.calculationText, { color: '#22c55e' }]}>
              Фактически сгенерировано: {subsets.length} подмножеств
            </Text>
          </View>
        )}
      </View>

      {/* Список подмножеств */}
      {showSubsets && subsets.length > 0 && (
        <View style={useMemoStyles.subsetsContainer}>
          <Text style={[useMemoStyles.subsetsTitle, { color: themeStyles.text }]}>
            Список подмножеств ({subsets.length}):
          </Text>
          <FlatList
            data={subsets}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={renderSubset}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={useMemoStyles.listContent}
            style={useMemoStyles.subsetsList}
          />
        </View>
      )}

      {/* Сообщение при пустом вводе */}
      {elementsCount === 0 && (
        <View style={useMemoStyles.emptyState}>
          <Text style={[useMemoStyles.emptyStateText, { color: themeStyles.secondary }]}>
            Введите элементы множества через запятую и нажмите кнопку для генерации подмножеств
          </Text>
        </View>
      )}
    </View>
  );
};

export default UseMemoScreen;