import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import Header from '../shared/Header';
import { useTheme } from '../theme/useTheme';

export default function CartScreen() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}> 
      <Header title="Корзина" />
      <View style={styles.content}>
        <Text>Корзина пуста.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 }, content: { flex: 1, padding: 16 } });