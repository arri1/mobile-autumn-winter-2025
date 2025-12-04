import { StyleSheet } from 'react-native';

export const LoginStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C5C6C7',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderColor: '#45A29E',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    paddingRight: 50,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  showPasswordText: {
    fontSize: 18,
  },
  primaryButton: {
    backgroundColor: '#ff859bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#0B0C10',
    fontWeight: '700',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#C5C6C7',
    fontSize: 14,
  },
  registerLink: {
    color: '#66FCF1',
    fontWeight: '600',
    fontSize: 14,
  },
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#1F2833',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#45A29E',
  },
  demoTitle: {
    color: '#66FCF1',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  demoAccount: {
    backgroundColor: '#0B0C10',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  demoAccountText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  demoAccountDetails: {
    color: '#C5C6C7',
    fontSize: 12,
  },
});