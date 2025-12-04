import { StyleSheet } from 'react-native';

export const useEffectStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
  },
  timerBox: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#0f172a',
    marginBottom: 20,
  },
  timerLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  timerValue: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '700',
    marginVertical: 8,
  },
  timerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#22c55e',
  },
  pauseButton: {
    backgroundColor: '#f97316',
  },
  resetButton: {
    backgroundColor: '#475569',
    marginRight: 0,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  quoteCard: {
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#f8fafc',
    flex: 1,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  refreshButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 10,
    alignItems: 'center',
  },
  refreshText: {
    color: '#2563eb',
    fontWeight: '600',
  },
});