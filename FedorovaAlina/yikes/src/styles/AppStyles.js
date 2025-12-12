import { StyleSheet, StatusBar, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  systemInfo: {
    alignItems: 'flex-start',
  },
  systemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  systemSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
  dockContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  dock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
  },
  dockItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 60,
  },
  dockIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  dockText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  dockTextActive: {
    color: '#00d4ff',
  },
  dockDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});