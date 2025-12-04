import React, { useState, useMemo } from 'react';
import {View, Text, TouchableOpacity, ScrollView,TextInput} from 'react-native';

import { styles } from '../styles/UseMemoScreen.styles.js';

const UseMemoScreen = ({ navigation }) => {
  // Состояния для примера 1
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [newNumber, setNewNumber] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Состояния для примера 2
  const [factorialInput, setFactorialInput] = useState(1);

  // 1. Фильтрация массива с useMemo
  const filteredNumbers = useMemo(() => {
    
    switch(filterType) {
      case 'even':
        return numbers.filter(n => n % 2 === 0);
      case 'odd':
        return numbers.filter(n => n % 2 !== 0);
      case 'prime':
        return numbers.filter(n => {
          if (n <= 1) return false;
          for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
          }
          return true;
        });
      default:
        return numbers;
    }
  }, [numbers, filterType]);

  // 2. Факториал с useMemo
  const factorial = useMemo(() => {
    let result = 1;
    for (let i = 2; i <= factorialInput; i++) {
      result *= i;
    }
    return result;
  }, [factorialInput]);

  // 3. Сортировка с useMemo
  const sortedNumbers = useMemo(() => {
    return [...numbers].sort((a, b) => a - b);
  }, [numbers]);

  // 4. Сумма всех чисел с useMemo
  const sumOfNumbers = useMemo(() => {
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]);

  // Добавление нового числа
  const addNumber = () => {
    const num = parseInt(newNumber);
    if (!isNaN(num)) {
      setNumbers([...numbers, num]);
      setNewNumber('');
    }
  };

  // Удаление числа
  const removeNumber = (index) => {
    const newNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(newNumbers);
  };

  // Сброс всех чисел
  const resetNumbers = () => {
    setNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    setFilterType('all');
    setFactorialInput(10);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Заголовок */}
        <View style={styles.header}>
          <Text style={styles.title}>🧠 Пример useMemo</Text>
          <Text style={styles.subtitle}>Оптимизация производительности через мемоизацию</Text>
        </View>

        

        {/* Пример 1: Фильтрация массива */}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>Пример 1: Фильтрация массива</Text>
          <Text style={styles.exampleDescription}>
            Фильтрация выполняется только при изменении массива или типа фильтра
          </Text>
          
          {/* Управление числами */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Введите число"
              value={newNumber}
              onChangeText={setNewNumber}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={addNumber}>
              <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>

          {/* Фильтры */}
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
              onPress={() => setFilterType('all')}
            >
              <Text style={[styles.filterButtonText, filterType === 'all' && styles.activeFilterText]}>
                Все
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'even' && styles.activeFilter]}
              onPress={() => setFilterType('even')}
            >
              <Text style={[styles.filterButtonText, filterType === 'even' && styles.activeFilterText]}>
                Четные
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'odd' && styles.activeFilter]}
              onPress={() => setFilterType('odd')}
            >
              <Text style={[styles.filterButtonText, filterType === 'odd' && styles.activeFilterText]}>
                Нечетные
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filterType === 'prime' && styles.activeFilter]}
              onPress={() => setFilterType('prime')}
            >
              <Text style={[styles.filterButtonText, filterType === 'prime' && styles.activeFilterText]}>
                Простые
              </Text>
            </TouchableOpacity>
          </View>

          {/* Результаты фильтрации */}
          <View style={styles.resultsContainer}>
            <Text style={styles.resultTitle}>
              {filterType === 'all' ? 'Все числа' : 
               filterType === 'even' ? 'Четные числа' : 
               filterType === 'odd' ? 'Нечетные числа' : 'Простые числа'}
            </Text>
            <Text style={styles.resultNumbers}>
              {filteredNumbers.join(', ')}
            </Text>
            <Text style={styles.resultCount}>
              Найдено: {filteredNumbers.length} чисел
            </Text>
          </View>

          {/* Исходный массив */}
          <View style={styles.numbersList}>
            <Text style={styles.numbersTitle}>Исходный массив (нажмите чтобы удалить):</Text>
            <View style={styles.numbersContainer}>
              {numbers.map((num, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.numberItem}
                  onPress={() => removeNumber(index)}
                >
                  <Text style={styles.numberText}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.codeExplanation}>
            <Text style={{fontWeight: 'bold'}}>Код:</Text> useMemo фильтрует массив только при изменении numbers или filterType
          </Text>
        </View>

        {/* Пример 2: Факториал */}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>Пример 2: Вычисление факториала</Text>
          <Text style={styles.exampleDescription}>
            Факториал вычисляется только при изменении входного числа
          </Text>
          
          <View style={styles.factorialContainer}>
            <View style={styles.factorialInputRow}>
              <Text style={styles.factorialLabel}>Факториал числа:</Text>
              <TextInput
                style={styles.factorialInput}
                value={factorialInput.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text);
                  if (!isNaN(num) && num >= 0 && num <= 20) {
                    setFactorialInput(num);
                  }
                }}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.factorialResultContainer}>
              <Text style={styles.factorialEquation}>
                {factorialInput}! =
              </Text>
              <Text style={styles.factorialResult}>
                {factorial.toLocaleString()}
              </Text>
            </View>
            
            <Text style={styles.codeExplanation}>
              <Text style={{fontWeight: 'bold'}}>Код:</Text> useMemo вычисляет факториал только при изменении factorialInput
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.resetButton} onPress={resetNumbers}>
            <Text style={styles.resetButtonText}>🔄 Сбросить</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.backButtonText}>← В меню</Text>
          </TouchableOpacity>
        </View>

      </View>

    </ScrollView>
  );
};

export default UseMemoScreen;