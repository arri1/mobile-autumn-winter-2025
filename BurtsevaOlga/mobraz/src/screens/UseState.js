import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles/UseStateScreen.styles.js';

const UseStateScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleGreet = () => {
    if (name.trim()) {
      setGreeting(`Привет, ${name}!`);
    } else {
      setGreeting('Пожалуйста, введите имя');
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Примеры использования useState</Text>
        
        {/* Пример 1: Счетчик */}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>1. Счетчик</Text>
          <Text style={styles.counterText}>Текущее значение: {count}</Text>
          
          <View style={styles.buttonRow}>
            <Button 
              title="Увеличить +" 
              onPress={() => setCount(count + 1)} 
            />
            
            <View style={{ marginVertical: 5 }} />
            
            <Button 
              title="Уменьшить -" 
              onPress={() => setCount(count - 1)} 
            />

            <View style={{ marginVertical: 5 }} />
            <Button 
              title="Удвоить" 
              onPress={() => setCount(count * 2)} 
            />

            <View style={{ marginVertical: 5 }} />
            
            <Button 
              title="Сбросить" 
              onPress={() => setCount(0)} 
            />
          </View>
        </View>

        {/* Пример 2: Видимость текста */}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>2. Управление видимостью</Text>
          
          {isVisible && (
            <Text style={styles.visibleText}>Этот текст можно скрыть!</Text>
          )}

          <Button 
            title={isVisible ? "Спрятать текст" : "Показать текст"} 
            onPress={() => setIsVisible(!isVisible)} 
          />
        </View>

        {/* Пример 3: Приветствие */}
        <View style={styles.exampleCard}>
          <Text style={styles.exampleTitle}>3. Форма приветствия</Text>
          
          <Text style={styles.label}>Введите ваше имя:</Text>
        
          <TextInput
            style={styles.input}
            placeholder="Ваше имя"
            value={name}
            onChangeText={setName}
          />
        
          <Button title="Поприветствовать" onPress={handleGreet} />
          
          {greeting ? (
            <Text style={styles.greeting}>{greeting}</Text>
          ) : null}
          
          <Text style={styles.info}>Вы ввели: {name}</Text>
        </View>

        {/* Кнопка возврата в меню */}
        <View style={styles.backButtonContainer}>
          <Button
            title="← Вернуться в меню"
            onPress={() => navigation.navigate('Home')}
            color="#8E8E93"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default UseStateScreen;