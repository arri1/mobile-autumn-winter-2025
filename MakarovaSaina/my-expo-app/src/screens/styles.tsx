import { StyleSheet } from 'react-native';

export const Colors = {
  primary: '#0B0C10',
  secondary: '#1F2833',
  accent: '#45A29E',
  lightAccent: '#66FCF1',
  pink: '#ff859bff',
  darkPink: '#f97a9cff',
  text: {
    primary: '#FFFFFF',
    secondary: '#C5C6C7',
    dark: '#0B0C10',
  },
};

export const CommonStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  input: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 12,
    padding: 16,
    color: Colors.text.primary,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 12,
    padding: 16,
    color: Colors.text.primary,
    fontSize: 16,
    paddingRight: 50,
  },
  primaryButton: {
    backgroundColor: Colors.pink,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: Colors.text.dark,
    fontWeight: '700',
    fontSize: 16,
  },
});

export const HomeStyles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary,
    marginBottom: 24,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.lightAccent,
    marginBottom: 12,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  featureArrow: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
});

export const AuthStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  form: {
    gap: 20,
  },
  showPasswordButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
  },
  showPasswordText: {
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.lightAccent,
    fontWeight: '600',
    fontSize: 14,
  },
  demoContainer: {
    marginTop: 32,
    padding: 16,
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  demoTitle: {
    color: Colors.lightAccent,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  demoAccount: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  demoAccountText: {
    color: Colors.text.primary,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  demoAccountDetails: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
});

export const HookStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
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
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 20,
  },
  loadingText: {
    color: Colors.lightAccent,
    fontSize: 16,
    marginTop: 16,
  },
  counterContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  counterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  counterButton: {
    backgroundColor: Colors.pink,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
  },
  counterButtonText: {
    color: Colors.text.dark,
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
    color: Colors.text.primary,
    marginBottom: 12,
  },
  postCard: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
  },
  postTitle: {
    color: Colors.text.primary,
    fontSize: 14,
  },
  buttonsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.pink,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.text.dark,
    fontWeight: '700',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: '#2D3748',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  navButtonText: {
    color: Colors.lightAccent,
    fontWeight: '600',
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navigationButtons: {
    gap: 12,
    marginBottom: 20,
  },
});

export const UseMemoStyles = StyleSheet.create({
  controlsContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    color: Colors.text.primary,
    marginBottom: 12,
    fontSize: 16,
  },
  departmentFilter: {
    marginTop: 8,
  },
  filterTitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#2D3748',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  filterButtonActive: {
    backgroundColor: Colors.accent,
  },
  filterButtonText: {
    color: Colors.text.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: Colors.text.dark,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightAccent,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightAccent,
    marginBottom: 8,
  },
  statsText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  addUserContainer: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  addUserInput: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    color: Colors.text.primary,
    fontSize: 14,
  },
  addUserButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addUserButtonDisabled: {
    backgroundColor: '#2D3748',
    opacity: 0.5,
  },
  addUserButtonText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.lightAccent,
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  userCard: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 2,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    minWidth: 36,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.accent,
  },
  deleteButton: {
    backgroundColor: Colors.darkPink,
  },
  actionButtonText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    color: Colors.text.primary,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#2D3748',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  saveButton: {
    backgroundColor: Colors.accent,
  },
  cancelButtonText: {
    color: Colors.text.secondary,
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 16,
  },
});

export const ZustandStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  exampleContainer: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.pink,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 18,
  },
  counterDisplay: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.lightAccent,
  },
  counterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  counterButton: {
    flex: 1,
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  counterButtonText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 14,
  },
  customInputContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  customInput: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    color: Colors.text.primary,
    fontSize: 14,
  },
  setButton: {
    backgroundColor: Colors.pink,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  setButtonText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 14,
  },
  currentUserContainer: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.lightAccent,
  },
  currentUserTitle: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  currentUserText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  addUserForm: {
    gap: 12,
    marginBottom: 16,
  },
  userInput: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    color: Colors.text.primary,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 14,
  },
  usersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  userItem: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  userActions: {
    flexDirection: 'row',
    gap: 8,
  },
  userActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  selectButton: {
    backgroundColor: Colors.accent,
  },
  deleteButton: {
    backgroundColor: Colors.darkPink,
  },
  userActionText: {
    color: Colors.text.dark,
    fontWeight: '600',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.text.secondary,
    fontStyle: 'italic',
    marginVertical: 20,
  },
  navigationButtons: {
    gap: 12,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#2D3748',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  navButtonText: {
    color: Colors.lightAccent,
    fontWeight: '600',
    fontSize: 14,
  },
  drawerHint: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.pink,
  },
  drawerHintText: {
    color: Colors.pink,
    fontWeight: '600',
    fontSize: 14,
  },
});