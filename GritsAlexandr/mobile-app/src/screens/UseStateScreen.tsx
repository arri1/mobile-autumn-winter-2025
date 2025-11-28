import { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useStateStyles } from '../styles/useStateStyles';

const UseStateScreen = () => {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  return (
    <View
      style={[
        { flex: 1, padding: 24 },
        { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
      ]}
    >
      <Text style={[useStateStyles.title, { color: isDark ? '#fff' : '#0f172a' }]}>
        useState
      </Text>
      <Text style={[useStateStyles.subtitle, { color: isDark ? '#cbd5e1' : '#64748b' }]}>
        Управление локальным состоянием компонента
      </Text>

      <View style={useStateStyles.row}>
        <Text style={[useStateStyles.label, { color: isDark ? '#e2e8f0' : '#0f172a' }]}>
          Тёмная тема
        </Text>
        <Switch value={isDark} onValueChange={setIsDark} />
      </View>

      <Text style={[useStateStyles.counter, { color: isDark ? '#fff' : '#0f172a' }]}>
        {count}
      </Text>
      <View style={useStateStyles.buttons}>
        <TouchableOpacity
          style={useStateStyles.button}
          onPress={() => setCount((prev) => prev - 1)}
        >
          <Text style={useStateStyles.buttonText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={useStateStyles.button}
          onPress={() => setCount((prev) => prev + 1)}
        >
          <Text style={useStateStyles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UseStateScreen;