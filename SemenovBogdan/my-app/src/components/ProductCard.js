import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.price}>{item.price} ₽</Text>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>В корзину</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  productName: { fontSize: 18, fontWeight: "600" },
  price: { fontSize: 16, marginVertical: 5, color: "#2c3e50" },
  button: {
    marginTop: 5,
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
