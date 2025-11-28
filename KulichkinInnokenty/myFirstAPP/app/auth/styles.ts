import { StyleSheet } from "react-native";

// Общие стили для всех auth экранов
export const authStyles = StyleSheet.create({
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	cardTitle: {
		marginBottom: 24,
	},
	buttonStack: {
		gap: 12,
		marginTop: 8,
	},
	footer: {
		gap: 16,
		alignItems: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 12,
	},
	loadingText: {
		marginBottom: 0,
	},
	infoSection: {
		gap: 0,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
	},
	divider: {
		height: 1,
		backgroundColor: "#E5E5E5",
	},
	roleBadge: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#E5E5E5",
	},
	aboutText: {
		marginBottom: 20,
	},
	techStack: {
		gap: 12,
	},
	techTitle: {
		marginBottom: 0,
	},
	techList: {
		gap: 6,
	},
});
