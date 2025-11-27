import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';

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
  const containerStyle = [
    styles.base,
    styles[`padding_${padding}`],
    styles[`bg_${background}`],
    style
  ];

  if (scrollable) {
    return (
      <ScrollView
        contentContainerStyle={containerStyle}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },

  // Padding variants
  padding_none: {
    padding: 0,
  },
  padding_sm: {
    padding: 16,
  },
  padding_md: {
    padding: 24,
  },
  padding_lg: {
    padding: 32,
  },

  // Background variants
  bg_white: {
    backgroundColor: '#FFFFFF',
  },
  bg_gray: {
    backgroundColor: '#FAFAFA',
  },
});
