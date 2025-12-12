import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 14,
  },
  infoBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 16,
  },
  infoTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  imageContainer: {
    minHeight: 300,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 300,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  catImageWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  catImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  imageInfo: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  codeTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  codeContent: {
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#d4d4d4',
  },
  stats: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  statsText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  tapHint: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
  },
  tapHintText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});