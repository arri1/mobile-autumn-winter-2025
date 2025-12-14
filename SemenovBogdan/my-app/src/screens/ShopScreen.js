import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

export default function ShopScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=50&skip=10");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const formatted = data.products.map(item => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          image: item.images[0],
        }));

        setProducts(formatted);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />;
  }

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
