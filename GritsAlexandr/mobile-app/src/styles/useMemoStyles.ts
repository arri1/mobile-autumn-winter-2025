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
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
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
  },
  subsetScroll: {
    flexGrow: 1,
  },
  subsetText: {
    color: '#22c55e',
    fontSize: 16,
  },
});