import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style
}) => {
  return (
    <View style={[
      styles.base,
      variant === 'outlined' && styles.outlined,
      variant === 'elevated' && styles.elevated,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
  },
  outlined: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});
