import React, { useMemo } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import CartItem from "../components/CartItem";
import { useCartStore } from "../store/cartStore";
import { theme } from '../theme/theme';

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart) || []; // защита от undefined
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <FlatList
        data={cart}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CartItem item={item} onRemove={() => removeFromCart(index)} />
        )}
        contentContainerStyle={{ padding: theme.spacing.md }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Корзина пуста</Text>}
      />
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Итого: {total} $</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
  totalBox: { padding: 20, backgroundColor: "#fff" },
  totalText: { fontSize: 20, fontWeight: "700", textAlign: "right" },
});
