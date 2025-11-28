import { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useStateStyles } from '../styles/useStateStyles';
import { useAppStore } from '../store/useAppStore';
import { darkThemeStyles, lightThemeStyles } from '../styles/appStyles';

const UseStateScreen = () => {
  const [count, setCount] = useState(0);
  const [localName, setLocalName] = useState('');
  
  // Используем Zustand store для глобальной темы
  const { 
    theme,
    userName, 
    counters, 
    incrementCounter,
    setUserName,
    toggleTheme
  } = useAppStore();

  // Выбираем стили в зависимости от темы
  const themeStyles = theme === 'dark' ? darkThemeStyles : lightThemeStyles;

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    incrementCounter('useState');
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
    incrementCounter('useState');
  };

  const handleSaveName = () => {
    if (localName.trim()) {
      setUserName(localName);
      setLocalName('');
    }
  };

  return (
    <View
      style={[
        { flex: 1, padding: 24 },
        { backgroundColor: themeStyles.background },
      ]}
    >
      <Text style={[useStateStyles.title, { color: themeStyles.text }]}>
        useState + Zustand
      </Text>
      <Text style={[useStateStyles.subtitle, { color: themeStyles.secondary }]}>
        Локальное состояние + глобальное состояние
      </Text>

      {/* Глобальное состояние из Zustand */}
      <View style={[useStateStyles.row, { marginBottom: 30 }]}>
        <View>
          <Text style={[useStateStyles.label, { color: themeStyles.text }]}>
            Имя пользователя:
          </Text>
          <Text style={[useStateStyles.label, { 
            fontSize: 20, 
            color: themeStyles.primary 
          }]}>
            {userName}
          </Text>
        </View>
        <View>
          <Text style={[useStateStyles.label, { color: themeStyles.text }]}>
            Использований:
          </Text>
          <Text style={[useStateStyles.label, { 
            fontSize: 20, 
            color: themeStyles.primary 
          }]}>
            {counters.useState}
          </Text>
        </View>
      </View>

      {/* Глобальная тема */}
      <View style={useStateStyles.row}>
        <Text style={[useStateStyles.label, { color: themeStyles.text }]}>
          Глобальная тема: {theme === 'light' ? 'Светлая' : 'Тёмная'}
        </Text>
        <Switch 
          value={theme === 'dark'} 
          onValueChange={toggleTheme}
          trackColor={{ false: '#d1d5db', true: '#60a5fa' }}
          thumbColor={theme === 'dark' ? '#3b82f6' : '#f3f4f6'}
        />
      </View>

      {/* Изменение глобального состояния */}
      <View style={[useStateStyles.row, { marginBottom: 20 }]}>
        <TextInput
          value={localName}
          onChangeText={setLocalName}
          placeholder="Новое имя"
          placeholderTextColor={themeStyles.secondary}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: themeStyles.border,
            borderRadius: 8,
            padding: 12,
            color: themeStyles.text,
            marginRight: 10,
            backgroundColor: themeStyles.card,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: themeStyles.primary,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={handleSaveName}
        >
          <Text style={{ color: '#fff', fontWeight: '600' }}>Сохранить</Text>
        </TouchableOpacity>
      </View>

      {/* Локальное состояние счетчика */}
      <Text style={[useStateStyles.counter, { color: themeStyles.text }]}>
        {count}
      </Text>
      
      <View style={useStateStyles.buttons}>
        <TouchableOpacity
          style={[useStateStyles.button, { backgroundColor: themeStyles.primary }]}
          onPress={handleDecrement}
        >
          <Text style={useStateStyles.buttonText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[useStateStyles.button, { backgroundColor: themeStyles.primary }]}
          onPress={handleIncrement}
        >
          <Text style={useStateStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UseStateScreen;