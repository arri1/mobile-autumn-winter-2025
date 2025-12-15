import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import { theme } from '../theme/theme';

export default function ProductCard({ item, onAdd }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} $</Text>
      <AppButton title="В корзину" onPress={onAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.sm,
    resizeMode: "contain",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
});
