import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const UseMemoStyles = StyleSheet.create({
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
    borderColor: 'rgba(0, 212, 255, 0.2)',
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
    color: '#00d4ff',
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  
  // Counter Section
  counterSection: {
    alignItems: 'center',
  },
  counterLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  countButton: {
    marginHorizontal: 8,
  },
  countButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    minWidth: 60,
  },
  countButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  counterValueContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  counterValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  counterValueLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 4,
  },
  
  // Sort Button
  sortButton: {
    width: '100%',
    marginTop: 12,
  },
  sortButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    width: '48%',
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  statEmoji: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 16,
  },
  
  // Top/Bottom Container
  topBottomContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  topBottomItem: {
    marginBottom: 12,
  },
  topBottomLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginBottom: 4,
  },
  topBottomValue: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  // Results Scroll View
  resultsScrollView: {
    maxHeight: 300,
    marginBottom: 16,
  },
  resultsContent: {
    paddingBottom: 8,
  },
  
  // User Cards
  userCard: {
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.1)',
  },
  topUserCard: {
    backgroundColor: 'rgba(255, 215, 0, 0.05)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  bottomUserCard: {
    backgroundColor: 'rgba(255, 42, 109, 0.05)',
    borderColor: 'rgba(255, 42, 109, 0.3)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  userRank: {
    color: '#00d4ff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 6,
  },
  userMedal: {
    fontSize: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userDetail: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  userScore: {
    color: '#00d4ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  
  // Legend
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendGold: {
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
  },
  legendRed: {
    backgroundColor: 'rgba(255, 42, 109, 0.5)',
  },
  legendEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  legendText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  
  // Loading States
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  loadingText: {
    color: '#ff2a6d',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingSubtext: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  
  // Кнопки
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: '#00d4ff',
    fontSize: 12,
    marginLeft: 8,
  },
  
  // Terminal Output
  terminalOutput: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 20,
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
  },
  terminalText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    flex: 1,
  },
});