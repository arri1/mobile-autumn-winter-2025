import { StyleSheet } from 'react-native';

export const UseEffectStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingText: {
    color: '#66FCF1',
    fontSize: 16,
    marginTop: 16,
  },
  counterContainer: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  counterButton: {
    backgroundColor: '#ff859bff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  counterButtonText: {
    color: '#0B0C10',
    fontWeight: '600',
    fontSize: 16,
  },
  postsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#45A29E',
  },
  postTitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#ff859bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0B0C10',
    fontWeight: '700',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: '#2D3748',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#45A29E',
  },
  navButtonText: {
    color: '#66FCF1',
    fontWeight: '600',
  },
});