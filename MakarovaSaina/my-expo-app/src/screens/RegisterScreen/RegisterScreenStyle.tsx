import { StyleSheet } from 'react-native';

export const RegisterStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#66FCF1',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#C5C6C7',
  },
  input: {
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#1F2833',
    color: '#fff',
  },
  registerButton: {
    backgroundColor: '#45A29E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonDisabled: {
    backgroundColor: '#66FCF1',
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#0B0C10',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#C5C6C7',
  },
  loginLink: {
    fontSize: 16,
    color: '#66FCF1',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});