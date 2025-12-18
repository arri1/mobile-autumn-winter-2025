import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
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
  },
  buttonGroup: {
    gap: 10,
    flexDirection: "row",
  },
  input: {
    color: "#8e7b7bff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: "#22c55e",
    marginBottom: 8,
    fontWeight: "600",
  },
});