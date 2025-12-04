import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#e8f4fd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  timerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
    fontVariant: ['tabular-nums'],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    minWidth: 80,
  },
  startButton: {
    backgroundColor: '#34C759',
  },
  pauseButton: {
    backgroundColor: '#FF9500',
  },
  lapButton: {
    backgroundColor: '#5856D6',
  },
  resetButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.5,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  infoBoxText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: '#8E8E93',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  backButtonHint: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
});