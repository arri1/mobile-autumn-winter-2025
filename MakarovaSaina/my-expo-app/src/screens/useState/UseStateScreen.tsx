import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { UseStateStyles } from './UseStateStyle';

export default function UseStateLab({ navigation }: any) {
  const [count, setCount] = useState(0);
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const incrementCount = (): void => setCount(count + 1);
  const decrementCount = (): void => setCount(count - 1);
  const resetCount = (): void => setCount(0);

  const handlePrimaryButtonPress = (): void => {
    const newPressCount = buttonPressCount + 1;
    setButtonPressCount(newPressCount);
    Alert.alert('Уведомление', `Кнопка нажата ${newPressCount} раз(а)!`);
  };

  return (
    <SafeAreaView style={UseStateStyles.safeArea}>
      <ScrollView style={UseStateStyles.container}>
        <Text style={UseStateStyles.title}>useState 🎣</Text>

        <View style={UseStateStyles.counterContainer}>
          <Text style={UseStateStyles.counterTitle}>Счетчик: {count}</Text>
          <View style={UseStateStyles.counterButtons}>
            <TouchableOpacity 
              style={UseStateStyles.counterButton} 
              onPress={decrementCount}
              activeOpacity={0.7}
            >
              <Text style={UseStateStyles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={UseStateStyles.counterButton} 
              onPress={resetCount}
              activeOpacity={0.7}
            >
              <Text style={UseStateStyles.counterButtonText}>Сбросить</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={UseStateStyles.counterButton} 
              onPress={incrementCount}
              activeOpacity={0.7}
            >
              <Text style={UseStateStyles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={UseStateStyles.primaryButton} 
          onPress={handlePrimaryButtonPress}
          activeOpacity={0.7}
        >
          <Text style={UseStateStyles.primaryButtonText}>
            Нажми меня ({buttonPressCount})
          </Text>
        </TouchableOpacity>

        <View style={UseStateStyles.navigationButtons}>
          <TouchableOpacity 
            style={UseStateStyles.navButton} 
            onPress={() => navigation.navigate('UseEffect')}
            activeOpacity={0.7}
          >
            <Text style={UseStateStyles.navButtonText}>→ Перейти к useEffect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={UseStateStyles.navButton} 
            onPress={() => navigation.navigate('UseMemo')}
            activeOpacity={0.7}
          >
            <Text style={UseStateStyles.navButtonText}>→ Перейти к useMemo</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={UseStateStyles.navButton} 
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={UseStateStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}