import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageTitle: {
    marginTop: 8,
    marginBottom: 4,
  },
  pageSubtitle: {
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 16,
  },
  counterDisplay: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  buttonStack: {
    gap: 12,
    marginTop: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  buttonThird: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  textInfo: {
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listInput: {
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 0,
  },
  itemsList: {
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
  },
  itemText: {
    flex: 1,
  },
  listFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  infoList: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    marginTop: 8,
  },
});
