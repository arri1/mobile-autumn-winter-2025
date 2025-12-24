import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#fff'
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginBottom: 10
  },
  tab: {
    flex: 1, paddingVertical: 8, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent'
  },
  activeTab: { borderBottomColor: '#007AFF' },
  tabText: { fontSize: 16, color: '#8E8E93', fontWeight: '600' },
  activeTabText: { color: '#007AFF' },

  // Card
  card: {
    backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 12,
    borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 2, elevation: 2
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  authorRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: '#E1E1E6',
    justifyContent: 'center', alignItems: 'center', marginRight: 8
  },
  avatarText: { fontWeight: 'bold', color: '#666' },
  authorName: { fontWeight: '600', fontSize: 14 },
  date: { fontSize: 12, color: '#8E8E93' },
  actionsRow: { flexDirection: 'row' },
  actionBtn: { marginLeft: 16 },

  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  content: { fontSize: 15, color: '#333', lineHeight: 20 },
  
  // Utils
  centerLoader: { flex: 1 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff',  padding: 20, minHeight: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  input: {
    backgroundColor: '#F2F2F7', borderRadius: 10, padding: 12,
    fontSize: 16, marginBottom: 12
  },
  textArea: { height: 120, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: '#007AFF', borderRadius: 10, padding: 16,
    alignItems: 'center', marginTop: 10
  },
  submitBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});