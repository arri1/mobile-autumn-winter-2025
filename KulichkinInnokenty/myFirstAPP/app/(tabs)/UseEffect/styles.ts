import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	pageTitle: {
		marginTop: 10,
		marginBottom: 4,
	},
	pageSubtitle: {
		marginBottom: 24,
	},
	card: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	cardTitle: {
		marginBottom: 16,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#E5E5E5",
	},
	loadingText: {
		marginBottom: 0,
	},
	postContainer: {
		gap: 8,
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#E5E5E5",
	},
	postContent: {
		paddingLeft: 12,
		borderLeftWidth: 2,
	},
	buttonStack: {
		gap: 12,
		marginTop: 16,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
	},
	buttonHalf: {
		flex: 1,
	},
	timerDisplay: {
		alignItems: "center",
		gap: 8,
		paddingVertical: 20,
	},
	eventContainer: {},
	counterDisplay: {
		alignItems: "center",
		gap: 8,
		paddingVertical: 16,
	},
	switchRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textPreview: {
		gap: 4,
		marginTop: 12,
	},
});
