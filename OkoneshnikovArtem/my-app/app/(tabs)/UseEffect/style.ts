import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  section: {
    padding: 20,
    borderRadius: 16,
    gap: 12,
    backgroundColor: "#2d2d2d",
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#ffffff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
    flexWrap: "wrap",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#555",
    color: "#ffffff",
    backgroundColor: "#1a1a1a",
    fontSize: 16,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
  errorText: {
    color: "#ff5252",
    fontSize: 16,
  },
});