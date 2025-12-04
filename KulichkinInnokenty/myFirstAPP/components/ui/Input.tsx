import React from 'react';
import { View, TextInput, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import useThemeStore from '../../store/themeStore';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  style,
  ...props
}) => {
  const { colors } = useThemeStore();
  const hasError = !!error;

  const labelStyle: TextStyle = {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.2,
  };

  const inputStyle: TextStyle = {
    height: 48,
    borderWidth: 1,
    borderColor: hasError ? colors.textPrimary : colors.inputBorder,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.inputBackground,
    ...(hasError && { borderWidth: 2 }),
    ...(props.editable === false && { backgroundColor: colors.border, color: colors.textTertiary }),
  };

  return (
    <View style={[{ marginBottom: 20 }, containerStyle]}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        style={[inputStyle, style]}
        placeholderTextColor={colors.inputPlaceholder}
        {...props}
      />
      {error && (
        <Text style={{ fontSize: 12, color: colors.textPrimary, marginTop: 4, fontWeight: '500' }}>
          {error}
        </Text>
      )}
      {helperText && !error && (
        <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 4 }}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

