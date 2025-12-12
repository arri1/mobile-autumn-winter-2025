import { StyleSheet, StatusBar } from 'react-native';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  paddingHorizontal: 20,
},
titleContainer: {
  flex: 1,
},
profileButton: {
  backgroundColor: 'rgba(255, 215, 0, 0.2)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(255, 215, 0, 0.3)',
  flexDirection: 'row',
  alignItems: 'center',
},
profileButtonGradient: {
  flexDirection: 'row',
  alignItems: 'center',
},
profileAvatar: {
  fontSize: 16,
  marginRight: 6,
},
userInfo: {
  flex: 1,
  marginRight: 8,
},
profileName: {
  color: 'white',
  fontSize: 14,
  fontWeight: '600',
  maxWidth: 100, 
},
userRole: {
  color: 'rgba(255, 215, 0, 0.8)',
  fontSize: 11,
  marginTop: 2,
},

loginButton: {
  backgroundColor: 'rgba(0, 100, 200, 0.3)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(0, 100, 200, 0.5)',
  flexDirection: 'row',
  alignItems: 'center',
},
loginButtonGradient: {
  flexDirection: 'row',
  alignItems: 'center',
},

loginButtonText: {
  color: '#FFD700',
  fontSize: 14,
  fontWeight: '600',
  marginLeft: 6,
},
  newYearBadge: {
  backgroundColor: 'rgba(255, 0, 0, 0.2)',
  paddingHorizontal: 15,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(255, 0, 0, 0.3)',
  alignSelf: 'flex-start',
},

newYearText: {
  color: '#FFD700',
  fontSize: 18,
  fontWeight: 'bold',
},
  subtitle: {
    fontSize: 16,
    color: '#81D4FA',
    fontWeight: '500',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  badgeContainer: {
  alignItems: 'center',
  marginBottom: 15,
},

badge: {
  backgroundColor: 'rgba(255, 215, 0, 0.1)',
  paddingHorizontal: 16,
  paddingVertical: 6,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'rgba(255, 215, 0, 0.3)',
},

badgeText: {
  color: '#FFD700',
  fontSize: 12,
  fontWeight: '500',
},
  snowflakeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    marginVertical: 10,
    opacity: 0.6,
  },
  snowflake: {
    fontSize: 22,
  },
  snowflake2: {
    fontSize: 18,
  },
  snowflake3: {
    fontSize: 26,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  card: {
    height: 100,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  cardIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardDecor: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  decorText: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 16,
    fontWeight: '400',
    marginBottom: 6,
  },
  cardHint: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  newYearMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 20,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.15)',
    alignItems: 'center',
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    position: 'relative',
  },
  footerText: {
    color: '#81D4FA',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeDot: {
    backgroundColor: '#FF6B6B',
    transform: [{ scale: 1.2 }],
  },
  dotSnow: {
    backgroundColor: '#81D4FA',
  },
  dotGift: {
    backgroundColor: '#FFD700',
  },
  santaHat: {
    position: 'absolute',
    right: 25,
    top: 0,
  },
  santaHatText: {
    fontSize: 32,
  },
  // ДОБАВЛЕННЫЕ СТИЛИ ИЗ App.js
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  userAvatar: {
    fontSize: 16,
    marginRight: 8,
  },
  userName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  authSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  profileButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  authButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  authButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statusGradient: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  logoutButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  
});