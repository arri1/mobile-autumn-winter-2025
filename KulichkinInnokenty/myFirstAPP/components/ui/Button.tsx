import React from "react";
import {
	TouchableOpacity,
	Text,
	ActivityIndicator,
	ViewStyle,
	TextStyle,
} from "react-native";
import useThemeStore from "../../store/themeStore";

interface ButtonProps {
	onPress: () => void;
	title: string;
	variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	loading?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
	onPress,
	title,
	variant = "primary",
	size = "md",
	disabled = false,
	loading = false,
	style,
	textStyle: customTextStyle,
}) => {
	const { colors } = useThemeStore();
	const isDisabled = disabled || loading;

	const sizeStyles = {
		sm: {
			paddingHorizontal: 12,
			paddingVertical: 8,
			minHeight: 32,
			fontSize: 14,
			lineHeight: 20,
		},
		md: {
			paddingHorizontal: 16,
			paddingVertical: 12,
			minHeight: 44,
			fontSize: 16,
			lineHeight: 24,
		},
		lg: {
			paddingHorizontal: 24,
			paddingVertical: 16,
			minHeight: 56,
			fontSize: 18,
			lineHeight: 28,
		},
	}[size];

	const variantStyles = {
		primary: {
			bg: colors.buttonPrimary,
			text: colors.buttonPrimaryText,
			border: "transparent",
		},
		secondary: {
			bg: colors.textSecondary,
			text: colors.backgroundElevated,
			border: "transparent",
		},
		outline: {
			bg: "transparent",
			text: colors.buttonOutlineText,
			border: colors.buttonOutline,
		},
		ghost: {
			bg: "transparent",
			text: colors.buttonGhostText,
			border: "transparent",
		},
		destructive: {
			bg: colors.buttonPrimary,
			text: colors.buttonPrimaryText,
			border: "transparent",
		},
	}[variant];

	const buttonStyle: ViewStyle = {
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: variantStyles.bg,
		paddingHorizontal: sizeStyles.paddingHorizontal,
		paddingVertical: sizeStyles.paddingVertical,
		minHeight: sizeStyles.minHeight,
		...(variant === "outline" && {
			borderWidth: 1,
			borderColor: variantStyles.border,
		}),
		...(isDisabled && { opacity: 0.4 }),
	};

	const textStyle: TextStyle = {
		fontWeight: "600",
		letterSpacing: 0.2,
		color: variantStyles.text,
		fontSize: sizeStyles.fontSize,
		lineHeight: sizeStyles.lineHeight,
	};

	const activityColor =
		variant === "primary" ? colors.buttonPrimaryText : colors.buttonPrimary;

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={isDisabled}
			activeOpacity={0.7}
			style={[buttonStyle, style]}
		>
			{loading ? (
				<ActivityIndicator color={activityColor} size="small" />
			) : (
				<Text style={[textStyle, customTextStyle]}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};
