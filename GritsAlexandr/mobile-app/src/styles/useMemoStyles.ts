import { StyleSheet } from 'react-native';

export const useMemoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 20,
  },
  heading: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subheading: {
    color: '#cbd5f5',
    fontSize: 14,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  hint: {
    fontSize: 14,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  calculateButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  resetButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  calculationBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  calculationTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#f8fafc',
  },
  calculationText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#cbd5e1',
  },
  calculationResult: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
    color: '#22c55e',
  },
  subsetsContainer: {
    flex: 1,
  },
  subsetsTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#f8fafc',
  },
  subsetsList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  subsetItem: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  subsetIndex: {
    color: '#94a3b8',
    marginRight: 12,
    width: 28,
    fontSize: 14,
  },
  subsetScroll: {
    flexGrow: 1,
  },
  subsetText: {
    color: '#22c55e',
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});