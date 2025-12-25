import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
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
    fontSize: 24,
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 24,
  },
  canvas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 16,
    overflow: 'hidden',
  },
  svg: {
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedColor: {
    borderColor: '#007AFF',
    borderWidth: 4,
    transform: [{ scale: 1.1 }],
  },
  brushPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  brushButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  selectedBrush: {
    borderColor: '#007AFF',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  brushPreview: {
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  undoButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stats: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    opacity: 0.7,
  },
});