import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";

export default function ShopScreen({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: "1", name: "Смартфон", price: 35000 },
        { id: "2", name: "Ноутбук", price: 75000 },
        { id: "3", name: "Наушники", price: 5000 },
        { id: "4", name: "Смарт-часы", price: 12000 },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const addToCart = (product) => setCart([...cart, product]);

  if (loading) return <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard item={item} onAdd={() => addToCart(item)} />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 10 },
});
