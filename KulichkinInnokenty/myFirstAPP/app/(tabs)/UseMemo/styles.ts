import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	pageTitle: {
		marginTop: 8,
		marginBottom: 4,
	},
	pageSubtitle: {
		marginBottom: 24,
	},
	cardTitle: {
		marginBottom: 16,
	},
	eventContainer: {
		padding: 16,
		borderLeftWidth: 2,
		gap: 8,
	},
	eventHint: {
		marginTop: 4,
		marginBottom: 0,
	},
	counterDisplay: {
		alignItems: "center",
		gap: 8,
		paddingVertical: 16,
	},
	memoResult: {
		marginTop: 12,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "#E5E5E5",
	},
	memoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	oddText: {
		color: "#525252",
	},
	buttonStack: {
		gap: 12,
		marginTop: 16,
	},
	switchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textPreview: {
		gap: 4,
		marginTop: 12,
		marginBottom: 16,
	},
	statsContainer: {
		gap: 12,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "#E5E5E5",
	},
	statsTitle: {
		marginBottom: 4,
	},
	statsGrid: {
		flexDirection: "row",
		gap: 12,
	},
	statItem: {
		flex: 1,
		padding: 16,
		borderRadius: 4,
		alignItems: "center",
		gap: 8,
	},
	statValue: {
		marginBottom: 0,
	},
	statsHint: {
		marginTop: 4,
		marginBottom: 0,
	},
	infoList: {
		gap: 12,
	},
	infoItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
	},
	infoBullet: {
		width: 6,
		height: 6,
		borderRadius: 3,
		marginTop: 8,
	},
});
