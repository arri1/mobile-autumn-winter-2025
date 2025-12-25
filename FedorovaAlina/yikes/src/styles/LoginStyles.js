import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LoginStyles = StyleSheet.create({
  // Градиентный фон
  gradientBackground: {
    flex: 1,
  },
  
  // Safe Area
  safeArea: {
    flex: 1,
  },
  
  // Контент
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  
  // Кибер-линии
  cyberLineTop: {
    height: 2,
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    marginBottom: 40,
  },
  cyberLineBottom: {
    height: 2,
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    marginTop: 40,
  },
  
  // Логотип
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d4ff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  logoSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 3,
  },
  
  // Карточка авторизации
  loginCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    marginBottom: 30,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  
  // Переключение режимов
  modeSwitchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  modeButtonTextActive: {
    color: '#00d4ff',
  },
  
  // Поля ввода
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 14,
  },
  passwordToggle: {
    padding: 8,
  },
  
  // Ошибки
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 42, 109, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.3)',
  },
  errorText: {
    color: '#ff2a6d',
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  
  // Кнопки
  loginButton: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#00d4ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  
  apiStatusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  apiStatusButtonText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // Терминальный вывод
  terminalOutput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  terminalLine: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  terminalPrompt: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    width: 20,
  },
  terminalText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    flex: 1,
  },
  
  // Статус системы
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00d4ff',
    marginRight: 8,
  },
  statusText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});