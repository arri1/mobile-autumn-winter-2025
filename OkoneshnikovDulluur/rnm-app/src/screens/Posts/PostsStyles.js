import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  card: {
    borderRadius: 16,
    marginBottom: 16
  },
  mt: {
    marginTop: 12
    },
  mtSmall: {
    marginTop: 8
  },

  error: {
    color: "red",
    marginTop: 10
  },
  note: {
    opacity: 0.7,
    marginTop: 8
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },

  post: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  postTitle: {
    fontWeight: "700",
    marginBottom: 4
  },
  postMeta: {
    opacity: 0.7,
    marginBottom: 6
  },
  postContent: {
    opacity: 0.9 
  },
});
