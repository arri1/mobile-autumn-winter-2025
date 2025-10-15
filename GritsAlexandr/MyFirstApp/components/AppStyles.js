import { StyleSheet } from 'react-native';

export const lightTheme = {
  background: '#ffffff',
  text: '#000000',
  button: '#007AFF',
};

export const darkTheme = {
  background: '#1c1c1c',
  text: '#ffffff',
  button: '#6c63ff',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 24,
  },
  buttonContainer: {
    width: '80%',
    maxWidth: 300,
  },
});


