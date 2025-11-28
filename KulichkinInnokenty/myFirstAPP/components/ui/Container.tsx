import React from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import useThemeStore from '../../store/themeStore';

interface ContainerProps {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  background?: 'white' | 'gray';
  style?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  scrollable = false,
  padding = 'md',
  background = 'gray',
  style
}) => {
  const { colors } = useThemeStore();

  const paddingValue = {
    none: 0,
    sm: 16,
    md: 24,
    lg: 32,
  }[padding];

  const backgroundColor = background === 'white'
    ? colors.backgroundElevated
    : colors.background;

  const baseStyle: ViewStyle = {
    flex: 1,
  };

  if (scrollable) {
    const scrollContentStyle: ViewStyle = {
      padding: paddingValue,
      backgroundColor,
      ...style,
    };

    return (
      <ScrollView
        style={baseStyle}
        contentContainerStyle={scrollContentStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  const containerStyle: ViewStyle = {
    ...baseStyle,
    padding: paddingValue,
    backgroundColor,
    ...style,
  };

  return <View style={containerStyle}>{children}</View>;
};

