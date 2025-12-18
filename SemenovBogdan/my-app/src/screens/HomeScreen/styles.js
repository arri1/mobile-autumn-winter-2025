import { theme } from '../../theme/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.background,
	},
	list: {
		padding: 16,
	},
	card: {
		backgroundColor: theme.colors.card,
		borderRadius: theme.radius.md,
		padding: 16,
		marginBottom: 12,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	author: {
		fontSize: 12,
		color: theme.colors.muted,
	},
	draft: {
		marginTop: 6,
		color: '#e67e22',
		fontSize: 12,
		fontWeight: '600',
	},
	published: {
		marginTop: 6,
		color: '#27ae60',
		fontSize: 12,
		fontWeight: '600',
	},
	title: {
		marginTop: 6,
		fontSize: 16,
		fontWeight: '600',
		color: theme.colors.text,
	},
	content: {
		marginTop: 6,
		fontSize: 14,
		color: theme.colors.muted,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 12,
	},
	publishButton: {
		backgroundColor: theme.colors.primary,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
		marginRight: 8,
	},
	actionText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '600',
	},
	deleteButton: {
		backgroundColor: '#e74c3c',
		borderRadius: 8,
		padding: 6,
	},
	addButton: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		backgroundColor: theme.colors.primary,
		width: 56,
		height: 56,
		borderRadius: 28,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '90%',
		backgroundColor: '#fff',
		borderRadius: 16,
		padding: 20,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		padding: 12,
		marginBottom: 12,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	modalButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		backgroundColor: theme.colors.primary,
		alignItems: 'center',
		marginHorizontal: 4,
	},
	modalButtonText: {
		color: '#fff',
		fontWeight: '600',
	},
});
