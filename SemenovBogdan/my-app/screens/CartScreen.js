import React, { useMemo } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CartItem from "../components/CartItem";

export default function CartScreen({ cart, setCart }) {
  const removeFromCart = (id) => {
    setCart(cart.filter((_, index) => index !== id));
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  }, [cart]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cart}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CartItem item={item} onRemove={() => removeFromCart(index)} />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Итого: {total} ₽</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  totalBox: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  totalText: { fontSize: 20, fontWeight: "700", textAlign: "right" },
});
