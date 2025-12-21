import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const UseStateStyles = StyleSheet.create({
  // Контейнеры
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  safeArea: {
    flex: 1,
  },
  
  // Заголовок
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#0a0a0a',
  },
  headerCenter: {
    alignItems: 'center',
  },
  titleBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  titleBadgeText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 8,
    letterSpacing: 2,
  },
  
  // Разделительная линия
  cyberLine: {
    height: 1,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    marginHorizontal: 24,
    marginVertical: 20,
  },
  
  // Карточки
  cardWrapper: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
  },
  
  // Заголовок карточки
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  
  // Счетчик
  counterDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  counterLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
  },
  
  // Группа кнопок
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Кнопки действий
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#00d4ff',
    fontSize: 12,
    marginTop: 4,
  },
  
  // Текстовый дисплей
  textDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff2a6d',
    textAlign: 'center',
  },
  
  // Toggle кнопка
  toggleButton: {
    backgroundColor: 'rgba(255, 42, 109, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.3)',
  },
  toggleButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#ff2a6d',
    fontSize: 12,
    marginLeft: 8,
  },
  
  // Состояние системы
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  
  // Text Input
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.2)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    marginRight: 8,
  },
  setButton: {
    backgroundColor: 'rgba(255, 42, 109, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.3)',
  },
  setButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Text State Card
  textCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.2)',
  },
  textDisplayContainer: {
    backgroundColor: 'rgba(255, 42, 109, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 42, 109, 0.3)',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  textStateLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 8,
  },
  
  // Boolean State Card
  booleanCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  booleanIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  booleanButton: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  booleanButtonText: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});