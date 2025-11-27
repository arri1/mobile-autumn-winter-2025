import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f4f6f8",
	},
	scrollContent: {
		flexGrow: 1,
		padding: 20,
		alignItems: "center",
	},
	header: {
		alignItems: "center",
		marginBottom: 30,
		marginTop: 40,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
	},
	card: {
		backgroundColor: "white",
		borderRadius: 16,
		padding: 20,
		marginBottom: 30,
		width: "90%",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 3,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 16,
		color: "#333",
		textAlign: "center",
	},
	label: {
		fontSize: 14,
		marginBottom: 6,
		fontWeight: "600",
		color: "#555",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 12,
		width: "100%",
		marginBottom: 16,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	buttonGroup: {
		marginBottom: 12,
	},
	loadingContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	loadingText: {
		marginLeft: 10,
		fontSize: 16,
		color: "#007AFF",
	},
	footer: {
		alignItems: "center",
		marginTop: 20,
	},
	footerText: {
		color: "#666",
		fontSize: 16,
		marginBottom: 12,
	},
	// Profile specific styles
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	value: {
		fontSize: 16,
		color: "#333",
	},
	roleText: {
		color: "#007AFF",
		fontWeight: "600",
		textTransform: "uppercase",
	},
	infoText: {
		fontSize: 16,
		color: "#444",
		marginBottom: 8,
	},
});
