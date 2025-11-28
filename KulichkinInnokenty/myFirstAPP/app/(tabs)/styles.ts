import { StyleSheet } from "react-native";

// Стили для главной страницы (index.tsx)
export const homeStyles = StyleSheet.create({
	pageTitle: {
		marginTop: 10,
		marginBottom: 4,
	},
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	cardTitle: {
		marginBottom: 16,
	},
	statusRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E5E5",
		marginVertical: 8,
	},
	buttonStack: {
		gap: 12,
	},
	featureList: {
		gap: 12,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},
	bullet: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#000000",
		marginTop: 8,
	},
});

// Стили для explore.tsx
export const exploreStyles = StyleSheet.create({
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	cardTitle: {
		marginBottom: 16,
	},
	description: {
		marginBottom: 16,
	},
	techList: {
		gap: 0,
	},
	techItem: {
		paddingVertical: 12,
		gap: 4,
	},
	techName: {
		marginBottom: 4,
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E5E5",
	},
	componentList: {
		gap: 12,
		marginTop: 8,
	},
	componentItem: {
		gap: 4,
	},
	principlesList: {
		gap: 20,
	},
	principleItem: {
		flexDirection: "row",
		gap: 16,
	},
	numberBadge: {
		width: 40,
		height: 40,
		borderRadius: 4,
		backgroundColor: "#000000",
		justifyContent: "center",
		alignItems: "center",
	},
	principleContent: {
		flex: 1,
		gap: 4,
	},
	principleName: {
		marginBottom: 4,
	},
	colorGrid: {
		gap: 12,
	},
	colorRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	colorBox: {
		width: 48,
		height: 48,
		borderRadius: 4,
	},
	colorInfo: {
		flex: 1,
		gap: 2,
	},
});
