import React, { useMemo } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/cartStore";

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart) || []; // защита от undefined
  const removeFromCart = useCartStore((state) => state.removeFromCart);

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
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Корзина пуста</Text>}
      />
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Итого: {total} ₽</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  totalBox: { padding: 20, borderTopWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" },
  totalText: { fontSize: 20, fontWeight: "700", textAlign: "right" },
});
