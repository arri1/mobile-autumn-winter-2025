import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 16, 
    paddingTop: Platform.OS === 'android' ? 40 : 16,
    borderBottomWidth: 1,
    // borderBottomColor задается динамически
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  tab: {
    marginRight: 20,
    paddingVertical: 8,
    borderBottomWidth: 2, 
    borderBottomColor: 'transparent'
  },
  activeTab: { 
    borderBottomColor: '#007AFF' 
  },
  tabText: { 
    fontSize: 16, 
    fontWeight: '600' 
  },

  // Card
  card: {
    marginHorizontal: 16, 
    marginBottom: 16,
    borderRadius: 16, 
    padding: 16,
    // Аккуратные тени
    ...Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1, // Уменьшили прозрачность тени
            shadowRadius: 8,
        },
        android: {
            elevation: 3, // Небольшое возвышение
        },
    }),
  },
  cardHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 12 
  },
  authorRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12
  },
  avatarText: { 
    fontWeight: 'bold', 
    fontSize: 16,
  },
  authorName: { 
    fontSize: 15,
    fontWeight: '600',
  },
  date: { 
    fontSize: 12, 
    marginTop: 2 
  },
  
  // Actions
  actionsRow: { 
    flexDirection: 'row',
    marginLeft: 8
  },
  actionBtn: { 
    marginLeft: 12,
    padding: 4 
  },

  // Content
  title: { 
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8 
  },
  content: { 
    fontSize: 15, 
    lineHeight: 22,
  },
  
  // Utils
  centerLoader: { flex: 1 },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 40, 
    fontSize: 16 
  },

  // Modal
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'flex-end' 
  },
  modalContent: { 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20, 
    minHeight: 450 
  },
  modalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 24 
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderRadius: 12, 
    padding: 16,
    fontSize: 16, 
    marginBottom: 16
  },
  textArea: { 
    height: 150, 
    textAlignVertical: 'top' 
  },
  submitBtn: {
    backgroundColor: '#007AFF', 
    borderRadius: 12, 
    padding: 16,
    alignItems: 'center', 
    marginTop: 10
  },
  submitBtnText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});