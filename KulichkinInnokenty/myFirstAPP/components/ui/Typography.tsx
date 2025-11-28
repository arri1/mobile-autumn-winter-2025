import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import useThemeStore from "../../store/themeStore";

interface TypographyProps {
	children: React.ReactNode;
	variant?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "body"
		| "bodySmall"
		| "caption"
		| "label";
	weight?: "normal" | "medium" | "semibold" | "bold";
	color?: "primary" | "secondary" | "tertiary" | "disabled";
	align?: "left" | "center" | "right";
	style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
	children,
	variant = "body",
	weight = "normal",
	color = "primary",
	align = "left",
	style,
}) => {
	const { colors } = useThemeStore();

	const colorValue = {
		primary: colors.textPrimary,
		secondary: colors.textSecondary,
		tertiary: colors.textTertiary,
		disabled: colors.textDisabled,
	}[color];

	return (
		<Text
			style={[
				styles.base,
				styles[variant],
				styles[`weight_${weight}`],
				{ color: colorValue },
				{ textAlign: align },
				style,
			]}
		>
			{children}
		</Text>
	);
};

// Heading components for convenience
export const H1: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="h1" {...props} />
);

export const H2: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="h2" {...props} />
);

export const H3: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="h3" {...props} />
);

export const H4: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="h4" {...props} />
);

export const Body: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="body" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="caption" {...props} />
);

export const Label: React.FC<Omit<TypographyProps, "variant">> = (props) => (
	<Typography variant="label" {...props} />
);

const styles = StyleSheet.create({
	base: {
		letterSpacing: 0.2,
	},

	// Variants - иерархия размеров
	h1: {
		fontSize: 36,
		lineHeight: 48,
		fontWeight: "700",
		marginBottom: 16,
	},
	h2: {
		fontSize: 30,
		lineHeight: 40,
		fontWeight: "700",
		marginBottom: 12,
	},
	h3: {
		fontSize: 24,
		lineHeight: 32,
		fontWeight: "600",
		marginBottom: 12,
	},
	h4: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "600",
		marginBottom: 8,
	},
	body: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 8,
	},
	bodySmall: {
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 6,
	},
	caption: {
		fontSize: 12,
		lineHeight: 16,
		marginBottom: 4,
	},
	label: {
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "600",
		marginBottom: 8,
	},

	// Weights
	weight_normal: {
		fontWeight: "400",
	},
	weight_medium: {
		fontWeight: "500",
	},
	weight_semibold: {
		fontWeight: "600",
	},
	weight_bold: {
		fontWeight: "700",
	},
});
