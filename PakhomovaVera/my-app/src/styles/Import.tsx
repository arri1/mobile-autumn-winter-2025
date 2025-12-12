import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    paddingTop: 60,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'red',
  },
  stats: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  statsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  list: {
    padding: 15,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  infoBox: {
    backgroundColor: '#e7f3ff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
   backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    zIndex: 1,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  }
});