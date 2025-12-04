import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1c1c1e',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  infoText: {
    fontSize: 16,
    color: '#1c1c1e',
    textAlign: 'center',
    lineHeight: 22,
  },
  menuButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  iconText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 20,
    color: '#c7c7cc',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5ea',
    marginVertical: 30,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: '#1c1c1e',
    textAlign: 'center',
    marginBottom: 10,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
  },
});