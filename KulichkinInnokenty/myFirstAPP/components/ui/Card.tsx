import React from 'react';
import { View, ViewStyle } from 'react-native';
import useThemeStore from '../../store/themeStore';

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
  const { colors } = useThemeStore();

  const baseStyle: ViewStyle = {
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
  };

  const outlinedStyle: ViewStyle = variant === 'outlined' ? {
    borderWidth: 1,
    borderColor: colors.cardBorder,
  } : {};

  const elevatedStyle: ViewStyle = variant === 'elevated' ? {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  } : {};

  return (
    <View style={[baseStyle, outlinedStyle, elevatedStyle, style]}>
      {children}
    </View>
  );
};
