import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  timerSection: {
    backgroundColor: '#2c3e50',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  timerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 10,
  },
  timerDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1abc9c',
    marginBottom: 20,
    fontFamily: 'monospace',
  },
  timerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  timerButton: {
    backgroundColor: '#34495e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  timerButtonActive: {
    backgroundColor: '#e74c3c',
  },
  timerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  timerText: {
    marginTop: 20,
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
  // СТАРЫЕ СТИЛИ
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  refreshText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 5,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  backButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  userCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
