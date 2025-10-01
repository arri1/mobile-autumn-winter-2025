import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UseMemoScreen() {
    
  const [input, setInput] = useState('1,2,3');

  const findAllSubsets = useMemo(() => {
    
    const elements = input.split(',')
      .map(item => item.trim())
      .filter(Boolean);
    
    if (elements.length === 0) return [[]];

    const generateSubsets = (arr) => {
      if (arr.length === 0) return [[]];
      
      const first = arr[0];
      const rest = arr.slice(1);
      const subsetsWithoutFirst = generateSubsets(rest);
      const subsetsWithFirst = subsetsWithoutFirst.map(subset => [first, ...subset]);
      
      return [...subsetsWithoutFirst, ...subsetsWithFirst];
    };
    
    const subsets = generateSubsets(elements);
    return subsets.sort((a, b) => a.length - b.length);
  }, [input]);

  const currentTheme = {
    background: '#121212',
    text: '#FFFFFF',
    card: '#1E1E1E',
    border: '#333333',
    button: '#00ff00ff',
    inputBackground: '#2D2D2D',
  };

  const getElementsCount = () => {
    return input.split(',').map(item => item.trim()).filter(Boolean).length;
  };

  const renderSubsetItem = ({ item, index }) => (
    <View style={styles.subsetItem}>
      <Text style={styles.subsetIndex}>{index + 1}.</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subsetText}>
          {item.length > 0 ? `{${item.join(', ')}}` : '∅'}
        </Text>
      </ScrollView>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: currentTheme.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: currentTheme.text,
      textAlign: 'center',
    },
    card: {
      backgroundColor: currentTheme.card,
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: currentTheme.border,
    },
    input: {
      backgroundColor: currentTheme.inputBackground,
      borderWidth: 1,
      borderColor: currentTheme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: currentTheme.text,
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: currentTheme.text,
      marginBottom: 8,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#00ff00ff',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: currentTheme.text,
      textAlign: 'center',
    },
    subsetItem: {
      flexDirection: 'row',
      backgroundColor: currentTheme.inputBackground,
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: currentTheme.border,
      alignItems: 'center',
      minHeight: 50,
    },
    subsetIndex: {
      fontSize: 14,
      color: '#888',
      marginRight: 10,
      minWidth: 30,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
    },
    subsetText: {
      fontSize: 16,
      color: '#00ff00ff',
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Все подмножества</Text>

      <View style={styles.card}>
        <Text style={styles.inputLabel}>Элементы:</Text>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Введите элементы через запятую"
          placeholderTextColor="#888"
        />

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{getElementsCount()}</Text>
            <Text style={styles.statLabel}>Элементов</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{findAllSubsets.length}</Text>
            <Text style={styles.statLabel}>Подмножеств</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={findAllSubsets}
        renderItem={renderSubsetItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}