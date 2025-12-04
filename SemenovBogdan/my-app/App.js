import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ShopScreen from "./src/screens/ShopScreen";
import CartScreen from "./src/screens/CartScreen";

export default function App() {
  const [tab, setTab] = useState("shop");
  const [cart, setCart] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Навбар */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setTab("shop")}>
          <Text style={[styles.navText, tab === "shop" && styles.activeTab]}>
            Магазин
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("cart")}>
          <Text style={[styles.navText, tab === "cart" && styles.activeTab]}>
            Корзина ({cart.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Экран */}
      {tab === "shop" ? (
        <ShopScreen cart={cart} setCart={setCart} />
      ) : (
        <CartScreen cart={cart} setCart={setCart} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#2c3e50",
  },
  navText: { color: "#bdc3c7", fontSize: 18, fontWeight: "600" },
  activeTab: { color: "#ecf0f1", textDecorationLine: "underline" },
});
