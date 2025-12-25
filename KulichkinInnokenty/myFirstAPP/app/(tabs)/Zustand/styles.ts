import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	pageTitle: {
		marginBottom: 4,
	},
	pageSubtitle: {
		marginBottom: 24,
	},
	cardTitle: {
		marginBottom: 16,
	},
	statusRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 16,
	},
	statusValue: {
		marginLeft: 8,
	},
	userInfo: {
		gap: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#E5E5E5',
	},
	infoRow: {
		gap: 4,
	},
	loadingRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#E5E5E5',
	},
	loadingText: {
		marginBottom: 0,
	},
	errorContainer: {
		marginTop: 12,
		padding: 12,
		backgroundColor: '#FAFAFA',
		borderRadius: 4,
		borderLeftWidth: 2,
		borderLeftColor: '#000000',
	},
	buttonStack: {
		gap: 12,
	},
});
