import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  counterText: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonGroup: {
    gap: 10,
    flexDirection: "row",
  },
  switchLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
  },
  previewText: {
    fontSize: 16,
    color: "#444",
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#007AFF",
    marginBottom: 12,
    fontWeight: "600",
  },
  postContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
  },
  postContent: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  timerText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#007AFF",
    marginVertical: 12,
  },
});
