import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#0a0a0a',
  },
  systemInfo: {
    flex: 1,
  },
  systemTitle: {
    color: '#00d4ff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  systemSubtitle: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  systemStatus: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00d4ff',
    marginRight: 6,
  },
  statusText: {
    color: '#00d4ff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 100,
  },
  dockContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    alignItems: 'center',
  },
  dock: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dockItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dockIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  dockText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    marginTop: 2,
  },
  dockTextActive: {
    color: '#00d4ff',
  },
  dockDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});