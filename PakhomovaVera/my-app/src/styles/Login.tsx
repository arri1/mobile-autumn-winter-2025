import {  StyleSheet  } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
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
    marginBottom: 40,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stateInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e7f3ff',
    borderRadius: 10,
  },
  stateText: {
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
  },
});