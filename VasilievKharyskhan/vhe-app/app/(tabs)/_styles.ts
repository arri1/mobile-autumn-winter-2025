import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
    },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  mainTitle: {
    fontSize: 32,
    marginBottom: 12,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  themeButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#E5E5EA',
  },
  profilePhoto: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  info: {
    fontSize: 16,
    opacity: 0.7,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  techText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  contactLabel: {
    fontSize: 16,
    opacity: 0.6,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 16,
  },
  footerText: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 14,
    opacity: 0.6,
  },
});