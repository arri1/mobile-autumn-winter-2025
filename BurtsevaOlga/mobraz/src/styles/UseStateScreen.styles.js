import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1c1c1e',
  },
  exampleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 15,
  },
  counterText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  buttonRow: {
    marginTop: 10,
  },
  visibleText: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 15,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  greeting: {
    fontSize: 18,
    color: 'green',
    marginTop: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  info: {
    marginTop: 15,
    color: 'gray',
    fontSize: 14,
  },
  backButtonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  footer: {
    textAlign: 'center',
    color: '#8e8e93',
    fontStyle: 'italic',
  },
});