import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { HookStyles } from './styles';

export default function UseStateScreen({ navigation }: any) {
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
    <SafeAreaView style={HookStyles.safeArea}>
      <ScrollView style={HookStyles.container}>
        <Text style={HookStyles.title}>useState</Text>

        <View style={HookStyles.counterContainer}>
          <Text style={HookStyles.counterTitle}>Счетчик: {count}</Text>
          <View style={HookStyles.counterButtons}>
            <TouchableOpacity style={HookStyles.counterButton} onPress={decrementCount}>
              <Text style={HookStyles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={HookStyles.counterButton} onPress={resetCount}>
              <Text style={HookStyles.counterButtonText}>Сбросить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={HookStyles.counterButton} onPress={incrementCount}>
              <Text style={HookStyles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={HookStyles.primaryButton} onPress={handlePrimaryButtonPress}>
          <Text style={HookStyles.primaryButtonText}>Нажми меня ({buttonPressCount})</Text>
        </TouchableOpacity>

        <View style={HookStyles.navigationButtons}>
          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('UseEffect')}>
            <Text style={HookStyles.navButtonText}>→ Перейти к useEffect</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('UseMemo')}>
            <Text style={HookStyles.navButtonText}>→ Перейти к useMemo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={HookStyles.navButton} onPress={() => navigation.navigate('Home')}>
            <Text style={HookStyles.navButtonText}>← На главную</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}