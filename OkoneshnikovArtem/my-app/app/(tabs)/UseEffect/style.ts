import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        padding: 16,
        borderRadius: 8,
        gap: 10,
        backgroundColor: "#232224ff",
        width: "30vh",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "none",
        gap: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#ffffff",
        color: "#ffffff",
    },
});