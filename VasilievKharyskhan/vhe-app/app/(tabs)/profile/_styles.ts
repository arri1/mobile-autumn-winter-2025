import { StyleSheet } from "react-native";

// Общие стили для всех auth экранов
export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        alignItems: "center",
    },
	header: {
		marginTop: 24,
		marginBottom: 32,
		gap: 8,
	},
	subtitle: {
		opacity: 0.7,
		fontSize: 14,
	},
    title: {
        marginBottom: 12,
		fontSize: 24,
    },
	mainTitle: {
		fontSize: 24,
		marginBottom: 12,
	},
    card: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        width: "90%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
    },
	themeButton: {
		marginTop: 16,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	themeButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: '600',
	},
    label: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: "600",
        alignSelf: "flex-start",
    },
    input: {
        color: "#8e7b7bff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        width: "100%",
        marginBottom: 10,
        fontSize: 16,
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