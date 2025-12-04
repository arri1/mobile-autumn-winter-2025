import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#2d2d2d",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#ffffff",
  },
  buttonGroup: {
    gap: 10,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#1a1a1a",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
    color: "#cccccc",
    alignSelf: "flex-start",
  },
  infoText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#ff5252",
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 8,
    fontWeight: "600",
  },
});