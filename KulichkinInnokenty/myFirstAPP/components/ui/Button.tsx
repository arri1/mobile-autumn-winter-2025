import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        styles[variant],
        styles[`${size}Size`],
        isDisabled && styles.disabled,
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#FFFFFF' : '#000000'}
          size="small"
        />
      ) : (
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          isDisabled && styles.disabledText,
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: '#000000',
  },
  secondary: {
    backgroundColor: '#404040',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000000',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  destructive: {
    backgroundColor: '#000000',
  },

  // Sizes
  smSize: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 32,
  },
  mdSize: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
  },
  lgSize: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },

  // Text styles
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#000000',
  },
  ghostText: {
    color: '#000000',
  },
  destructiveText: {
    color: '#FFFFFF',
  },

  // Text sizes
  smText: {
    fontSize: 14,
    lineHeight: 20,
  },
  mdText: {
    fontSize: 16,
    lineHeight: 24,
  },
  lgText: {
    fontSize: 18,
    lineHeight: 28,
  },

  // Disabled state
  disabled: {
    opacity: 0.4,
  },
  disabledText: {
    opacity: 1,
  },
});
