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
  effectText: {
    fontSize: 16,
    color: "#64b5f6",
  },
  counterText: {
    fontSize: 18,
    marginBottom: 12,
    color: "#ffffff",
  },
  evenText: {
    color: "#4caf50",
    fontSize: 16,
  },
  oddText: {
    color: "#ff5252",
    fontSize: 16,
  },
  buttonGroup: {
    gap: 10,
    flexDirection: "row",
    marginTop: 10,
  },
  switchLabel: {
    marginBottom: 10,
    fontSize: 16,
    color: "#ffffff",
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
  previewText: {
    fontSize: 16,
    color: "#ffffff",
  },
  lengthText: {
    marginTop: 8,
    color: "#ba68c8",
    fontSize: 16,
  },
});