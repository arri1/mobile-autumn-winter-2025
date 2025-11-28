// Типы для UI компонентов
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'label';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'disabled';

export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';
export type ContainerBackground = 'white' | 'gray';

export interface BaseComponentProps {
  style?: ViewStyle;
}

export interface BaseTextProps {
  style?: TextStyle;
}
